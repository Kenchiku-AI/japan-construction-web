import { useCallback, useState } from "react";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
import { Report, Image } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────

const MARGIN_W = 4;

const IMAGE_COL = 2;
const IMAGE_COL_WIDTH = 42;

const GAP_COL = 3;
const GAP_COL_WIDTH = 3;

const DETAILS_LABEL_COL = 4;
const DETAILS_VALUE_COL = 5;

const DETAILS_LABEL_WIDTH = 14;
const DETAILS_VALUE_WIDTH = 42;

const FIELD_ROW_HEIGHT = 22;

// Fixed minimum vertical space between image blocks.
// This is deliberately larger than a single normal row so the
// separation between photos is always clearly visible.
const IMAGE_SPACING_ROWS = 1;
const IMAGE_SPACING_ROW_HEIGHT = 30;

// ─────────────────────────────────────────────────────────────────────────────
// Borders
// ─────────────────────────────────────────────────────────────────────────────

const thinBorder = {
  top: {
    style: "thin" as const,
    color: { argb: "FF000000" },
  },
  bottom: {
    style: "thin" as const,
    color: { argb: "FF000000" },
  },
  left: {
    style: "thin" as const,
    color: { argb: "FF000000" },
  },
  right: {
    style: "thin" as const,
    color: { argb: "FF000000" },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Image
// ─────────────────────────────────────────────────────────────────────────────

async function fetchImageAsBase64(
  url: string,
): Promise<{ base64: string; ext: "jpeg" | "png" } | null> {
  try {
    const res = await fetch(url, { mode: "cors" });

    if (!res.ok) return null;

    const blob = await res.blob();

    const ext: "jpeg" | "png" = blob.type.includes("png")
      ? "png"
      : "jpeg";

    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const dataUrl = reader.result as string;

        resolve({
          base64: dataUrl.split(",")[1],
          ext,
        });
      };

      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

const getContainedImageDimensions = (
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
) => {
  const aspectRatio = width / height;

  let displayWidth = maxWidth;
  let displayHeight = displayWidth / aspectRatio;

  if (displayHeight > maxHeight) {
    displayHeight = maxHeight;
    displayWidth = displayHeight * aspectRatio;
  }

  return {
    width: displayWidth,
    height: displayHeight,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// Workbook
// ─────────────────────────────────────────────────────────────────────────────

async function buildReportWorkbook(
  ExcelJS: typeof import("exceljs"),
  report: Report,
  images: Image[],
  topLabel: string,
  t: (key: string) => string,
) {
  const wb = new ExcelJS.Workbook();

  const wsName = report.name
    .replace(/[*?:\\/\[\]]/g, "")
    .slice(0, 31);

  const ws = wb.addWorksheet(wsName, {
    pageSetup: {
      paperSize: 9,
      orientation: "portrait",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: {
        left: 0.3,
        right: 0.3,
        top: 0.5,
        bottom: 0.5,
        header: 0.2,
        footer: 0.2,
      },
    },

    views: [
      {
        showGridLines: false,
      },
    ],
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Columns
  //
  // A = left gutter
  // B = image / report content
  // C = gap between image and details
  // D = detail labels
  // E = detail values
  // F = right gutter
  // ───────────────────────────────────────────────────────────────────────────

  ws.columns = [
    {
      key: "A",
      width: MARGIN_W,
    },
    {
      key: "B",
      width: IMAGE_COL_WIDTH,
    },
    {
      key: "C",
      width: GAP_COL_WIDTH,
    },
    {
      key: "D",
      width: DETAILS_LABEL_WIDTH,
    },
    {
      key: "E",
      width: DETAILS_VALUE_WIDTH,
    },
    {
      key: "F",
      width: MARGIN_W,
    },
  ];

  // Explicitly set the gutter column widths as well.
  // This ensures the right gutter exists even though it contains
  // no report content.
  ws.getColumn(1).width = MARGIN_W;
  ws.getColumn(6).width = MARGIN_W;

  // Keep both gutter columns completely borderless.
  //
  // Assigning an alignment also causes ExcelJS to retain the cells
  // as part of the worksheet layout without adding visible content.
  for (let row = 1; row <= 1000; row++) {
    const leftGutterCell = ws.getCell(row, 1);
    leftGutterCell.border = {};
    leftGutterCell.alignment = {
      horizontal: "left",
      vertical: "middle",
    };

    const rightGutterCell = ws.getCell(row, 6);
    rightGutterCell.border = {};
    rightGutterCell.alignment = {
      horizontal: "left",
      vertical: "middle",
    };
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Style helper
  // ───────────────────────────────────────────────────────────────────────────

  const style = (
    cell: import("exceljs").Cell,
    opts: {
      bold?: boolean;
      size?: number;
      hAlign?: import("exceljs").Alignment["horizontal"];
      vAlign?: import("exceljs").Alignment["vertical"];
      wrap?: boolean;
      border?: any;
    } = {},
  ) => {
    cell.font = {
      name: "Yu Gothic",
      size: opts.size ?? 10,
      bold: opts.bold ?? false,
      color: {
        argb: "FF000000",
      },
    };

    cell.alignment = {
      horizontal: opts.hAlign ?? "left",
      vertical: opts.vAlign ?? "middle",
      wrapText: opts.wrap ?? false,
    };

    if (opts.border) {
      cell.border = opts.border;
    } else {
      cell.border = {};
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // HEADER
  // ───────────────────────────────────────────────────────────────────────────

  ws.getRow(1).height = 14;
  ws.getRow(2).height = 28;
  ws.getRow(3).height = 14;

  ws.mergeCells(2, 2, 2, 4);

  const titleCell = ws.getCell(2, 2);
  titleCell.value = report.name;

  style(titleCell, {
    bold: true,
    size: 18,
    vAlign: "middle",
  });

  const topLabelCell = ws.getCell(2, 5);
  topLabelCell.value = topLabel;

  style(topLabelCell, {
    size: 9,
    hAlign: "right",
    vAlign: "middle",
  });

  // ───────────────────────────────────────────────────────────────────────────
  // REPORT FIELDS
  // ───────────────────────────────────────────────────────────────────────────

  let currentRow = 4;

  const sortedFields = [...(report.fields ?? [])].sort((a, b) =>
    a.order !== b.order
      ? a.order - b.order
      : a.id.localeCompare(b.id),
  );

  for (const field of sortedFields) {
    ws.getRow(currentRow).height = FIELD_ROW_HEIGHT;

    // Label
    ws.mergeCells(currentRow, 2, currentRow, 3);

    const labelCell = ws.getCell(currentRow, 2);
    labelCell.value = field.name;

    style(labelCell, {
      size: 10,
      border: thinBorder,
      vAlign: "middle",
    });

    // Value
    ws.mergeCells(currentRow, 4, currentRow, 5);

    const valueCell = ws.getCell(currentRow, 4);
    valueCell.value = field.value;

    style(valueCell, {
      size: 10,
      border: thinBorder,
      wrap: true,
      vAlign: "middle",
    });

    currentRow++;
  }

  // Space before images
  currentRow += 2;

  // ───────────────────────────────────────────────────────────────────────────
  // FETCH IMAGES
  // ───────────────────────────────────────────────────────────────────────────

  const fetchedImages = await Promise.all(
    images.map((image) =>
      fetchImageAsBase64(image.download_url),
    ),
  );

  // ───────────────────────────────────────────────────────────────────────────
  // IMAGES
  // ───────────────────────────────────────────────────────────────────────────

  for (let index = 0; index < images.length; index++) {
    const image = images[index];
    const fetched = fetchedImages[index];

    const imageRow = currentRow;

    // ─────────────────────────────────────────────────────────────────────────
    // IMAGE DETAIL ROWS
    //
    // The image starts at the exact same row as Date Taken.
    //
    //   imageRow       = Date Taken
    //   imageRow + 1   = Description
    //   imageRow + 2   = Tags
    //   imageRow + 3   = blank spacing
    //   imageRow + 4   = blank spacing
    //   next image     = imageRow + 5
    // ─────────────────────────────────────────────────────────────────────────

    const dateRow = imageRow;
    const descriptionRow = imageRow + 1;
    const tagsRow = imageRow + 2;

    // Date
    ws.getRow(dateRow).height = 22;

    // Description
    ws.getRow(descriptionRow).height = 65;

    // Tags
    ws.getRow(tagsRow).height = 45;

    // ─────────────────────────────────────────────────────────────────────────
    // FIXED IMAGE SPACING
    //
    // These are intentionally blank rows. Their fixed heights guarantee
    // that there is always a minimum amount of visible vertical space
    // between one image block and the next.
    // ─────────────────────────────────────────────────────────────────────────

    for (
      let spacingIndex = 1;
      spacingIndex <= IMAGE_SPACING_ROWS;
      spacingIndex++
    ) {
      const spacingRow =
        tagsRow + spacingIndex;

      ws.getRow(spacingRow).height =
        IMAGE_SPACING_ROW_HEIGHT;

      // Make sure all cells in the spacing rows are completely
      // borderless.
      for (let col = 1; col <= 6; col++) {
        ws.getCell(spacingRow, col).border = {};
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // IMAGE CELL
    // ─────────────────────────────────────────────────────────────────────────

    const imageCell = ws.getCell(
      imageRow,
      IMAGE_COL,
    );

    imageCell.border = {};

    // ─────────────────────────────────────────────────────────────────────────
    // DATE
    // ─────────────────────────────────────────────────────────────────────────

    const dateLabelCell = ws.getCell(
      dateRow,
      DETAILS_LABEL_COL,
    );

    const dateValueCell = ws.getCell(
      dateRow,
      DETAILS_VALUE_COL,
    );

    dateLabelCell.value = t("date_taken");

    dateValueCell.value = new Date(image.created_at);
    dateValueCell.numFmt = "yyyy/mm/dd";

    style(dateLabelCell, {
      size: 10,
      border: thinBorder,
      vAlign: "middle",
    });

    style(dateValueCell, {
      size: 10,
      border: thinBorder,
      vAlign: "middle",
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DESCRIPTION
    // ─────────────────────────────────────────────────────────────────────────

    const descriptionLabelCell = ws.getCell(
      descriptionRow,
      DETAILS_LABEL_COL,
    );

    const descriptionValueCell = ws.getCell(
      descriptionRow,
      DETAILS_VALUE_COL,
    );

    descriptionLabelCell.value = t("description");

    descriptionValueCell.value =
      image.description ?? "";

    style(descriptionLabelCell, {
      size: 10,
      border: thinBorder,
      vAlign: "middle",
    });

    style(descriptionValueCell, {
      size: 10,
      border: thinBorder,
      wrap: true,
      vAlign: "middle",
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TAGS
    // ─────────────────────────────────────────────────────────────────────────

    const tagsLabelCell = ws.getCell(
      tagsRow,
      DETAILS_LABEL_COL,
    );

    const tagsValueCell = ws.getCell(
      tagsRow,
      DETAILS_VALUE_COL,
    );

    tagsLabelCell.value = t("tags");

    tagsValueCell.value = image.tags
      .map((tag) => tag.name)
      .join(", ");

    style(tagsLabelCell, {
      size: 10,
      border: thinBorder,
      vAlign: "middle",
    });

    style(tagsValueCell, {
      size: 10,
      border: thinBorder,
      wrap: true,
      vAlign: "middle",
    });

    // ─────────────────────────────────────────────────────────────────────────
    // ADD IMAGE
    // ─────────────────────────────────────────────────────────────────────────

    if (fetched) {
      const imgId = wb.addImage({
        base64: fetched.base64,
        extension: fetched.ext,
      });

      /*
       * The image is allowed to use the entire image column width and
       * the entire image-block height.
       *
       * The image itself is positioned at the TOP-LEFT of column B
       * and the Date Taken row.
       */
      const imageContentHeight =
        22 +
        65 +
        45;

      const CELL_WIDTH_PX =
        IMAGE_COL_WIDTH * 7;

      const CELL_HEIGHT_PX =
        imageContentHeight * 1.333;

      const dims =
        getContainedImageDimensions(
          image.width,
          image.height,
          CELL_WIDTH_PX,
          CELL_HEIGHT_PX,
        );

      ws.addImage(imgId, {
        tl: {
          // Exact top-left of column B / Date Taken row.
          col: IMAGE_COL - 1,
          row: imageRow - 1,
        } as any,

        ext: {
          width: dims.width,
          height: dims.height,
        },
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MOVE TO NEXT IMAGE
    //
    // The next image starts AFTER all of the fixed spacing rows.
    // ─────────────────────────────────────────────────────────────────────────

    currentRow =
      tagsRow +
      IMAGE_SPACING_ROWS +
      1;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // FOOTER
  // ───────────────────────────────────────────────────────────────────────────

  ws.mergeCells(
    currentRow,
    2,
    currentRow,
    5,
  );

  const footerCell = ws.getCell(
    currentRow,
    2,
  );

  footerCell.value = [
    report.company_name,
    report.project_name,
  ]
    .filter(Boolean)
    .join("    ");

  style(footerCell, {
    size: 9,
    hAlign: "right",
  });

  return wb;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export const useExportExcel = () => {
  const { t } = useTranslation();

  const [isExcelDownloading, setIsExcelDownloading] =
    useState(false);

  const downloadExcel = useCallback(
    async (
      report: Report,
      images: Image[],
      topLabel: string,
    ) => {
      setIsExcelDownloading(true);

      try {
        const ExcelJS =
          (await import("exceljs")) as typeof import("exceljs");

        const wb = await buildReportWorkbook(
          ExcelJS,
          report,
          images,
          topLabel,
          t,
        );

        const buffer =
          await wb.xlsx.writeBuffer();

        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(
          blob,
          `${report.name
            .replace(/ /g, "_")
            .replace(/[()]/g, "")}.xlsx`,
        );
      } catch (err) {
        console.error(
          "XLSX export failed",
          err,
        );
      } finally {
        setIsExcelDownloading(false);
      }
    },
    [t],
  );

  return {
    downloadExcel,
    isExcelDownloading,
  };
};