import { useCallback, useState } from "react";
import { saveAs } from "file-saver";
import { Report, ReportImage } from "@/types";

// ─── colour palette ───────────────────────────────────────────────────────────
const C = {
  navy: "FF1A3560",
  midBlue: "FF2E5FA3",
  paleGrey: "FFF5F7FA",
  white: "FFFFFFFF",
  darkText: "FF1A1A2E",
  midText: "FF3D4A6B",
  accent: "FFE8F0FB",
  border: "FFA8BBDA",
  hdrLabel: "FFC9D9F0",
};

function side(style: "thin" | "medium", argb: string) {
  return { style, color: { argb } };
}
const thinBorder: any = {
  top: side("thin", C.border),
  bottom: side("thin", C.border),
  left: side("thin", C.border),
  right: side("thin", C.border),
};

// Estimate column width for a string:
// full-width CJK chars count as 1.8 units, ASCII as 1.0
function estimateColWidth(text: string, fontSize = 9): number {
  let w = 0;
  for (const ch of text) {
    w += ch.charCodeAt(0) > 0x7f ? 1.8 : 1.0;
  }
  return (w + 2) * (fontSize / 10);
}

async function fetchImageAsBase64(
  url: string,
): Promise<{ base64: string; ext: "jpeg" | "png" } | null> {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) return null;
    const blob = await res.blob();
    const ext: "jpeg" | "png" = blob.type.includes("png") ? "png" : "jpeg";
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        resolve({ base64: dataUrl.split(",")[1], ext });
      };
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function buildReportWorkbook(
  ExcelJS: typeof import("exceljs"),
  report: Report,
  images: ReportImage[],
  topLabel: string,
) {
  const wb = new ExcelJS.Workbook();
  const wsName = report.name.replace(/[*?:\\/\[\]]/g, "").slice(0, 31);
  const ws = wb.addWorksheet(wsName, {
    pageSetup: { paperSize: 9, orientation: "portrait", fitToPage: true },
    views: [{ showGridLines: false }],
  });

  // ── pre-calculate field column widths ─────────────────────────────────────
  const sortedFields = [...(report.fields ?? [])].sort((a, b) =>
    a.order !== b.order ? a.order - b.order : a.id.localeCompare(b.id),
  );
  const half = Math.ceil(sortedFields.length / 2);
  const leftFields = sortedFields.slice(0, half);
  const rightFields = sortedFields.slice(half);

  const MIN_LABEL_W = 10;
  const MIN_VALUE_W = 18;
  const TOTAL_FIELD_W = 76; // combined width budget for both field columns

  const leftLabelW = Math.max(
    MIN_LABEL_W,
    ...leftFields.map((f) => estimateColWidth(f.name)),
  );
  const rightLabelW = rightFields.length
    ? Math.max(MIN_LABEL_W, ...rightFields.map((f) => estimateColWidth(f.name)))
    : 0;

  const halfTotal = TOTAL_FIELD_W / 2;
  const leftValueW = Math.max(MIN_VALUE_W, halfTotal - leftLabelW);
  const rightValueW = rightFields.length
    ? Math.max(MIN_VALUE_W, halfTotal - rightLabelW)
    : 0;

  // ── column layout ─────────────────────────────────────────────────────────
  // 1=A margin, 2=B label-L/photo-L, 3=C value-L/photo-L span,
  // 4=D gutter,  5=E label-R/photo-R, 6=F value-R/photo-R span, 7=G margin
  const GUTTER_W = 3;
  const MARGIN_W = 1.5;
  const TOTAL_COLS = 7;

  ws.columns = [
    { key: "A", width: MARGIN_W },
    { key: "B", width: leftLabelW },
    { key: "C", width: leftValueW },
    { key: "D", width: GUTTER_W },
    { key: "E", width: rightFields.length ? rightLabelW : leftLabelW },
    { key: "F", width: rightFields.length ? rightValueW : leftValueW },
    { key: "G", width: MARGIN_W },
  ];

  // ── style helper ──────────────────────────────────────────────────────────
  const style = (
    cell: import("exceljs").Cell,
    opts: {
      bg?: string;
      color?: string;
      bold?: boolean;
      italic?: boolean;
      size?: number;
      hAlign?: import("exceljs").Alignment["horizontal"];
      vAlign?: import("exceljs").Alignment["vertical"];
      wrap?: boolean;
      border?: any;
    },
  ) => {
    if (opts.bg)
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: opts.bg },
      };
    cell.font = {
      name: "Yu Gothic",
      size: opts.size ?? 9,
      bold: opts.bold ?? false,
      italic: opts.italic ?? false,
      color: { argb: opts.color ?? C.darkText },
    };
    cell.alignment = {
      horizontal: opts.hAlign ?? "left",
      vertical: opts.vAlign ?? "middle",
      wrapText: opts.wrap ?? false,
    };
    if (opts.border) cell.border = opts.border;
  };

  // ── background ────────────────────────────────────────────────────────────
  for (let r = 1; r <= 300; r++)
    for (let c = 1; c <= TOTAL_COLS; c++)
      ws.getCell(r, c).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: C.paleGrey },
      };

  // ── HEADER (rows 1-5) ─────────────────────────────────────────────────────
  ws.getRow(1).height = 6;
  ws.getRow(2).height = 32;
  ws.getRow(3).height = 12;
  ws.getRow(4).height = 3;
  ws.getRow(5).height = 6;

  for (let r = 1; r <= 3; r++)
    for (let c = 1; c <= TOTAL_COLS; c++)
      ws.getCell(r, c).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: C.navy },
      };

  for (let c = 1; c <= TOTAL_COLS; c++)
    ws.getCell(4, c).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: C.midBlue },
    };

  ws.mergeCells(2, 2, 2, 4);
  const titleCell = ws.getCell(2, 2);
  titleCell.value = report.name;
  style(titleCell, {
    bg: C.navy,
    color: C.white,
    bold: true,
    size: 18,
    vAlign: "middle",
  });

  ws.mergeCells(2, 5, 2, 6);
  const lblCell = ws.getCell(2, 5);
  lblCell.value = topLabel;
  style(lblCell, {
    bg: C.navy,
    color: "FFB8CCE8",
    size: 8,
    hAlign: "right",
    vAlign: "middle",
  });

  // ── FIELD SECTION HEADER (row 6) ──────────────────────────────────────────
  ws.getRow(6).height = 20;
  ws.mergeCells(6, 2, 6, 6);
  const secCell = ws.getCell(6, 2);
  secCell.value = "■ 作業情報";
  style(secCell, {
    bg: C.paleGrey,
    color: C.navy,
    bold: true,
    size: 10,
    vAlign: "middle",
  });

  // ── FIELD ROWS ────────────────────────────────────────────────────────────
  const FIELD_START = 7;
  const ROW_H = 19;

  const writeFieldRow = (
    row: number,
    label: string,
    value: string,
    labelCol: number,
    valCol: number,
  ) => {
    ws.getRow(row).height = ROW_H;
    const lc = ws.getCell(row, labelCol);
    lc.value = label;
    style(lc, {
      bg: C.hdrLabel,
      color: C.midBlue,
      bold: true,
      border: thinBorder,
    });
    const vc = ws.getCell(row, valCol);
    vc.value = value;
    style(vc, { bg: C.white, border: thinBorder, wrap: true });
  };

  leftFields.forEach((f, i) =>
    writeFieldRow(FIELD_START + i, f.name, f.value, 2, 3),
  );
  rightFields.forEach((f, i) =>
    writeFieldRow(FIELD_START + i, f.name, f.value, 5, 6),
  );

  const applyOuterBox = (r1: number, c1: number, r2: number, c2: number) => {
    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        ws.getCell(r, c).border = {
          top: r === r1 ? side("medium", C.navy) : side("thin", C.border),
          bottom: r === r2 ? side("medium", C.navy) : side("thin", C.border),
          left: c === c1 ? side("medium", C.navy) : side("thin", C.border),
          right: c === c2 ? side("medium", C.navy) : side("thin", C.border),
        } as any;
      }
    }
  };

  const FIELD_END =
    FIELD_START + Math.max(leftFields.length, rightFields.length) - 1;
  applyOuterBox(FIELD_START, 2, FIELD_END, 3);
  if (rightFields.length > 0) applyOuterBox(FIELD_START, 5, FIELD_END, 6);

  // ── PHOTO SECTION ─────────────────────────────────────────────────────────
  const PHOTO_SECTION_START = FIELD_END + 2;
  ws.getRow(PHOTO_SECTION_START - 1).height = 10;
  ws.getRow(PHOTO_SECTION_START).height = 20;

  ws.mergeCells(PHOTO_SECTION_START, 2, PHOTO_SECTION_START, 6);
  const phHdr = ws.getCell(PHOTO_SECTION_START, 2);
  phHdr.value = "■ 現場写真";
  style(phHdr, {
    bg: C.paleGrey,
    color: C.navy,
    bold: true,
    size: 10,
    vAlign: "middle",
  });

  const fetchedImages = await Promise.all(
    images.map((img) => fetchImageAsBase64(img.download_url)),
  );

  // Excel col width unit ≈ 8px; 1px = 0.75pt for row height
  const PX_PER_UNIT = 8;
  const PADDING_PX = 12; // vertical padding above and below image in cell
  const INSET_PX = 8; // horizontal inset each side for breathing room
  const pxToPoints = (px: number) => px * 0.75;

  // Image render width = combined column width minus inset on each side
  const IMG_W =
    Math.round((leftLabelW + leftValueW) * PX_PER_UNIT) - INSET_PX * 2;

  const CAPTION_H = 18;
  const DESC_H = 45;
  const SPACER_H = 8;

  const IMG_COL_L = 2; // left photo: cols B+C (2+3)
  const IMG_COL_R = 5; // right photo: cols E+F (5+6)

  let curRow = PHOTO_SECTION_START + 1;

  for (let pair = 0; pair < Math.ceil(images.length / 2); pair++) {
    const li = pair * 2;
    const ri = li + 1;

    const leftImg = images[li];
    const rightImg = ri < images.length ? images[ri] : null;

    const leftImgH = Math.round(IMG_W * (leftImg.height / leftImg.width));
    const rightImgH = rightImg
      ? Math.round(IMG_W * (rightImg.height / rightImg.width))
      : 0;

    const tallestImgH = Math.max(leftImgH, rightImgH);
    const photoRowHeight = pxToPoints(tallestImgH + PADDING_PX * 2);

    // ── caption row ────────────────────────────────────────────────────────
    ws.getRow(curRow).height = CAPTION_H;
    for (const [col, idx] of [
      [IMG_COL_L, li],
      [IMG_COL_R, ri],
    ] as [number, number][]) {
      if (idx >= images.length) continue;
      ws.mergeCells(curRow, col, curRow, col + 1);
      const cc = ws.getCell(curRow, col);
      cc.value = `写真 ${String(idx + 1).padStart(2, "0")}`;
      style(cc, {
        bg: C.midBlue,
        color: C.white,
        bold: true,
        hAlign: "center",
        border: thinBorder,
      });
    }
    curRow++;

    // ── photo row ──────────────────────────────────────────────────────────
    const photoRow = curRow;
    ws.getRow(photoRow).height = photoRowHeight;

    for (const [col, idx] of [
      [IMG_COL_L, li],
      [IMG_COL_R, ri],
    ] as [number, number][]) {
      if (idx >= images.length) continue;
      ws.mergeCells(photoRow, col, photoRow, col + 1);
      style(ws.getCell(photoRow, col), { bg: C.white, border: thinBorder });

      const fetched = fetchedImages[idx];
      if (fetched) {
        const imgId = wb.addImage({
          base64: fetched.base64,
          extension: fetched.ext,
        });
        const thisImgH = Math.round(
          IMG_W * (images[idx].height / images[idx].width),
        );

        // Center horizontally: INSET_PX on each side (image is already inset by INSET_PX)
        // Center vertically: offset by half the surplus height
        const surplusY = tallestImgH - thisImgH;
        const offsetYPx = PADDING_PX + surplusY / 2;

        // Convert px offsets to fractional col/row units for ExcelJS tl
        const colSpanPx = (leftLabelW + leftValueW) * PX_PER_UNIT;
        const colFrac = INSET_PX / colSpanPx;
        const rowFrac = pxToPoints(offsetYPx) / photoRowHeight;

        ws.addImage(imgId, {
          tl: { col: col - 1 + colFrac, row: photoRow - 1 + rowFrac } as any,
          ext: { width: IMG_W, height: thisImgH },
        });
      }
    }
    curRow++;

    // ── description row ────────────────────────────────────────────────────
    ws.getRow(curRow).height = DESC_H;
    for (const [col, idx] of [
      [IMG_COL_L, li],
      [IMG_COL_R, ri],
    ] as [number, number][]) {
      if (idx >= images.length) continue;
      ws.mergeCells(curRow, col, curRow, col + 1);
      const dc = ws.getCell(curRow, col);
      dc.value = images[idx].description;
      style(dc, {
        bg: C.accent,
        color: C.midText,
        size: 8,
        vAlign: "top",
        wrap: true,
        border: thinBorder,
      });
    }
    curRow++;

    // ── spacer ─────────────────────────────────────────────────────────────
    ws.getRow(curRow).height = SPACER_H;
    curRow++;
  }

  // ── FOOTER ────────────────────────────────────────────────────────────────
  ws.getRow(curRow).height = 4;
  for (let c = 1; c <= TOTAL_COLS; c++)
    ws.getCell(curRow, c).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: C.midBlue },
    };
  curRow++;

  ws.getRow(curRow).height = 16;
  ws.mergeCells(curRow, 2, curRow, 6);
  const ftCell = ws.getCell(curRow, 2);
  ftCell.value = `${report.company_name ?? ""}　　${report.project_name ?? ""}`;
  style(ftCell, {
    bg: C.paleGrey,
    color: "FF888888",
    size: 8,
    italic: true,
    hAlign: "right",
  });

  return wb;
}

// ─── hook ─────────────────────────────────────────────────────────────────────
export const useExportExcel = () => {
  const [isExcelDownloading, setIsExcelDownloading] = useState(false);

  const downloadExcel = useCallback(
    async (report: Report, images: ReportImage[], topLabel: string) => {
      setIsExcelDownloading(true);
      try {
        const ExcelJS = (await import("exceljs")) as typeof import("exceljs");
        const wb = await buildReportWorkbook(ExcelJS, report, images, topLabel);
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(
          blob,
          `${report.name.replace(/ /g, "_").replace(/[()]/g, "")}.xlsx`,
        );
      } catch (err) {
        console.error("XLSX export failed", err);
      } finally {
        setIsExcelDownloading(false);
      }
    },
    [],
  );

  return { downloadExcel, isExcelDownloading };
};
