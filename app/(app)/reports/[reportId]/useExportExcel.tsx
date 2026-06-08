import { useCallback, useState } from "react";
import { saveAs } from "file-saver";
import { Report, ReportImage } from "@/types";

// ─── colour palette (matches the openpyxl report) ────────────────────────────
const C = {
  navy: "FF1A3560",
  midBlue: "FF2E5FA3",
  lightBlue: "FFD6E4F7",
  paleGrey: "FFF5F7FA",
  white: "FFFFFFFF",
  darkText: "FF1A1A2E",
  midText: "FF3D4A6B",
  accent: "FFE8F0FB",
  border: "FFA8BBDA",
  hdrLabel: "FFC9D9F0",
};

// ExcelJS ARGB border helper
function side(style: "thin" | "medium", argb: string) {
  return { style, color: { argb } };
}
const thinBorder: any = {
  top: side("thin", C.border),
  bottom: side("thin", C.border),
  left: side("thin", C.border),
  right: side("thin", C.border),
};
const outerBorder: any = {
  top: side("medium", C.navy),
  bottom: side("medium", C.navy),
  left: side("medium", C.navy),
  right: side("medium", C.navy),
};

// ─── fetch a remote image and return { base64, extension } ───────────────────
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
        // strip the "data:image/...;base64," prefix
        const base64 = dataUrl.split(",")[1];
        resolve({ base64, ext });
      };
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

// ─── main builder ─────────────────────────────────────────────────────────────
async function buildReportWorkbook(
  ExcelJS: typeof import("exceljs"),
  report: Report,
  images: ReportImage[],
  topLabel: string,
) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(
    report.name.replace(/[*?:\\/\[\]]/g, "").slice(0, 31),
    {
      pageSetup: { paperSize: 9, orientation: "portrait", fitToPage: true },
      views: [{ showGridLines: false }],
    },
  );

  // ── column widths ──────────────────────────────────────────────────────────
  // A=margin, B=label-L, C=value-L, D=gutter, E=label-R, F=value-R,
  // G=pad, H=photo-L, I=gutter, J=photo-R, K=margin
  ws.columns = [
    { key: "A", width: 1.5 }, // 1
    { key: "B", width: 14 }, // 2  label left
    { key: "C", width: 26 }, // 3  value left
    { key: "D", width: 2 }, // 4  gutter
    { key: "E", width: 14 }, // 5  label right
    { key: "F", width: 26 }, // 6  value right
    { key: "G", width: 1.5 }, // 7
    { key: "H", width: 36 }, // 8  photo left
    { key: "I", width: 2 }, // 9
    { key: "J", width: 36 }, // 10 photo right
    { key: "K", width: 1.5 }, // 11
  ];

  // helper – set a cell's fill, font, alignment, border in one call
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
      border?: import("exceljs").Borders;
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

  // helper – merge + fill + border (ExcelJS needs merge before styling)
  const mergeStyle = (
    r1: number,
    c1: number,
    r2: number,
    c2: number,
    bg: string,
    bdr?: import("exceljs").Borders,
  ) => {
    ws.mergeCells(r1, c1, r2, c2);
    const cell = ws.getCell(r1, c1);
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: bg } };
    if (bdr) cell.border = bdr;
    return cell;
  };

  // background – paint every cell pale grey for a clean canvas
  for (let r = 1; r <= 300; r++) {
    for (let c = 1; c <= 11; c++) {
      ws.getCell(r, c).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: C.paleGrey },
      };
    }
  }

  // ── HEADER (rows 1-4) ──────────────────────────────────────────────────────
  ws.getRow(1).height = 6;
  ws.getRow(2).height = 32;
  ws.getRow(3).height = 12;
  ws.getRow(4).height = 3;

  // navy background rows 1-3
  for (let r = 1; r <= 3; r++)
    for (let c = 1; c <= 11; c++)
      ws.getCell(r, c).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: C.navy },
      };

  // title
  ws.mergeCells(2, 2, 2, 6);
  const titleCell = ws.getCell(2, 2);
  titleCell.value = report.name;
  style(titleCell, {
    bg: C.navy,
    color: C.white,
    bold: true,
    size: 18,
    vAlign: "middle",
  });

  // top-label (company / project / date)
  ws.mergeCells(2, 8, 2, 10);
  const lblCell = ws.getCell(2, 8);
  lblCell.value = topLabel;
  style(lblCell, {
    bg: C.navy,
    color: "FFB8CCE8",
    size: 8,
    hAlign: "right",
    vAlign: "middle",
  });

  // accent bar row 4
  for (let c = 1; c <= 11; c++)
    ws.getCell(4, c).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: C.midBlue },
    };

  ws.getRow(5).height = 6; // spacer

  // ── FIELD TABLE ────────────────────────────────────────────────────────────
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

  const sortedFields = [...(report.fields ?? [])].sort((a, b) =>
    a.order !== b.order ? a.order - b.order : a.id.localeCompare(b.id),
  );
  const leftFields = sortedFields.slice(0, 6);
  const rightFields = sortedFields.slice(6);

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

  // outer box around each field column block
  const applyOuterBox = (r1: number, c1: number, r2: number, c2: number) => {
    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        const cell = ws.getCell(r, c);
        cell.border = {
          top: r === r1 ? side("medium", C.navy) : side("thin", C.border),
          bottom: r === r2 ? side("medium", C.navy) : side("thin", C.border),
          left: c === c1 ? side("medium", C.navy) : side("thin", C.border),
          right: c === c2 ? side("medium", C.navy) : side("thin", C.border),
        };
      }
    }
  };

  const FIELD_END =
    FIELD_START + Math.max(leftFields.length, rightFields.length) - 1;
  applyOuterBox(FIELD_START, 2, FIELD_END, 3);
  applyOuterBox(FIELD_START, 5, FIELD_END, 6);

  // ── PHOTO SECTION ──────────────────────────────────────────────────────────
  const PHOTO_SECTION_START = FIELD_END + 2;
  ws.getRow(PHOTO_SECTION_START - 1).height = 10;
  ws.getRow(PHOTO_SECTION_START).height = 20;

  ws.mergeCells(PHOTO_SECTION_START, 2, PHOTO_SECTION_START, 5);
  const phHdr = ws.getCell(PHOTO_SECTION_START, 2);
  phHdr.value = "■ 現場写真";
  style(phHdr, {
    bg: C.paleGrey,
    color: C.navy,
    bold: true,
    size: 10,
    vAlign: "middle",
  });

  // Fetch all images in parallel
  const fetchedImages = await Promise.all(
    images.map((img) => fetchImageAsBase64(img.download_url)),
  );

  const CAPTION_H = 18;
  const PHOTO_H = 130;
  const DESC_H = 45;
  const SPACER_H = 8;
  // ExcelJS image size in EMUs; col width ≈36 chars → ~270px
  const IMG_W = 270;
  const IMG_H = 190;

  let curRow = PHOTO_SECTION_START + 1;

  for (let pair = 0; pair < Math.ceil(images.length / 2); pair++) {
    const li = pair * 2;
    const ri = li + 1;

    // caption row
    ws.getRow(curRow).height = CAPTION_H;
    for (const [col, idx] of [
      [2, li],
      [4, ri],
    ] as [number, number][]) {
      if (idx >= images.length) continue;
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

    // photo row
    const photoRow = curRow;
    ws.getRow(photoRow).height = PHOTO_H;
    for (const [col, idx] of [
      [2, li],
      [4, ri],
    ] as [number, number][]) {
      if (idx >= images.length) continue;
      const pc = ws.getCell(photoRow, col);
      style(pc, { bg: C.white, border: thinBorder });

      const fetched = fetchedImages[idx];
      if (fetched) {
        const imgId = wb.addImage({
          base64: fetched.base64,
          extension: fetched.ext,
        });
        // ExcelJS uses 0-indexed row/col for image placement
        ws.addImage(imgId, {
          tl: { col: col - 1 + 0.05, row: photoRow - 1 + 0.05 } as any,
          ext: { width: IMG_W, height: IMG_H },
        });
      }
    }
    curRow++;

    // description row
    ws.getRow(curRow).height = DESC_H;
    for (const [col, idx] of [
      [2, li],
      [4, ri],
    ] as [number, number][]) {
      if (idx >= images.length) continue;
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

    // spacer
    ws.getRow(curRow).height = SPACER_H;
    curRow++;
  }

  // ── FOOTER ────────────────────────────────────────────────────────────────
  ws.getRow(curRow).height = 4;
  for (let c = 1; c <= 11; c++)
    ws.getCell(curRow, c).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: C.midBlue },
    };
  curRow++;

  ws.getRow(curRow).height = 16;
  ws.mergeCells(curRow, 2, curRow, 10);
  const ftCell = ws.getCell(curRow, 2);
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadExcel = useCallback(
    async (report: Report, images: ReportImage[], topLabel: string) => {
      setIsDownloading(true);
      try {
        // dynamic import – only loads exceljs when the user clicks download
        const ExcelJS = (await import("exceljs")) as typeof import("exceljs");

        const wb = await buildReportWorkbook(ExcelJS, report, images, topLabel);

        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const filename = `${report.name.replace(/ /g, "_").replace(/[()]/g, "")}.xlsx`;
        saveAs(blob, filename);
      } catch (err) {
        console.error("XLSX export failed", err);
      } finally {
        setIsDownloading(false);
      }
    },
    [],
  );

  return { downloadExcel, isExcelDownloading: isDownloading };
};
