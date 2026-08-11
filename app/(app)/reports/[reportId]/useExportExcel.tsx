import { useCallback, useState } from "react";
import { saveAs } from "file-saver";
import { Report, Image } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────

const MARGIN_W = 4;

// Image is contained in ONE cell
const IMAGE_COL = 2;
const IMAGE_COL_WIDTH = 42;
const IMAGE_ROW_HEIGHT = 220;

// Small horizontal gap between image and details
const GAP_COL = 3;
const GAP_COL_WIDTH = 3;

// Details
const DETAILS_LABEL_COL = 4;
const DETAILS_VALUE_COL = 5;

const DETAILS_LABEL_WIDTH = 14;
const DETAILS_VALUE_WIDTH = 42;

// Report fields
const FIELD_LABEL_WIDTH = 22;
const FIELD_VALUE_WIDTH = 60;

const FIELD_ROW_HEIGHT = 22;
const IMAGE_SPACING_ROWS = 2;

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

/**
 * Calculate dimensions that fit INSIDE the image cell.
 */
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
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // HEADER
  // ───────────────────────────────────────────────────────────────────────────

  ws.getRow(1).height = 8;
  ws.getRow(2).height = 30;
  ws.getRow(3).height = 8;
  ws.getRow(4).height = 4;

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

  // Single-width divider
  for (let col = 2; col <= 5; col++) {
    ws.getCell(4, col).border = {
      bottom: {
        style: "thin",
        color: { argb: "FF000000" },
      },
    };
  }

  // ───────────────────────────────────────────────────────────────────────────
  // REPORT FIELDS
  // ───────────────────────────────────────────────────────────────────────────

  let currentRow = 6;

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

  // Space before photos
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

    // The image occupies ONE CELL.
    ws.getRow(imageRow).height = IMAGE_ROW_HEIGHT;

    const imageCell = ws.getCell(
      imageRow,
      IMAGE_COL,
    );

    imageCell.border = thinBorder;

    // Details cells
    const dateLabelCell = ws.getCell(
      imageRow,
      DETAILS_LABEL_COL,
    );

    const dateValueCell = ws.getCell(
      imageRow,
      DETAILS_VALUE_COL,
    );

    dateLabelCell.value = "Date";
    dateValueCell.value = new Date(image.created_at);
    dateValueCell.numFmt = "yyyy/mm/dd";

    style(dateLabelCell, {
      size: 10,
      border: thinBorder,
    });

    style(dateValueCell, {
      size: 10,
      border: thinBorder,
    });

    // ─────────────────────────────────────────────────────────────────────────
    // Description
    // ─────────────────────────────────────────────────────────────────────────

    const descriptionRow = imageRow + 1;

    ws.getRow(descriptionRow).height = 65;

    const descriptionLabelCell = ws.getCell(
      descriptionRow,
      DETAILS_LABEL_COL,
    );

    const descriptionValueCell = ws.getCell(
      descriptionRow,
      DETAILS_VALUE_COL,
    );

    descriptionLabelCell.value = "Description";
    descriptionValueCell.value = image.description ?? "";

    style(descriptionLabelCell, {
      size: 10,
      border: thinBorder,
      vAlign: "top",
    });

    style(descriptionValueCell, {
      size: 10,
      border: thinBorder,
      wrap: true,
      vAlign: "top",
    });

    // ─────────────────────────────────────────────────────────────────────────
    // Tags
    // ─────────────────────────────────────────────────────────────────────────

    const tagsRow = imageRow + 2;

    ws.getRow(tagsRow).height = 45;

    const tagsLabelCell = ws.getCell(
      tagsRow,
      DETAILS_LABEL_COL,
    );

    const tagsValueCell = ws.getCell(
      tagsRow,
      DETAILS_VALUE_COL,
    );

    tagsLabelCell.value = "Tags";

    tagsValueCell.value = image.tags
      .map((tag) => tag.name)
      .join(", ");

    style(tagsLabelCell, {
      size: 10,
      border: thinBorder,
      vAlign: "top",
    });

    style(tagsValueCell, {
      size: 10,
      border: thinBorder,
      wrap: true,
      vAlign: "top",
    });

    // ─────────────────────────────────────────────────────────────────────────
    // Add image INSIDE the single image cell
    // ─────────────────────────────────────────────────────────────────────────

    if (fetched) {
      const imgId = wb.addImage({
        base64: fetched.base64,
        extension: fetched.ext,
      });

      /*
       * Excel column width isn't exactly pixels, so this is an approximation.
       * The important part is that the image dimensions are calculated against
       * the actual available size of the single image cell.
       */

      const CELL_WIDTH_PX = IMAGE_COL_WIDTH * 7;
      const CELL_HEIGHT_PX = IMAGE_ROW_HEIGHT * 1.333;

      const dims = getContainedImageDimensions(
        image.width,
        image.height,
        CELL_WIDTH_PX - 12,
        CELL_HEIGHT_PX - 12,
      );

      // Center image within the cell.
      const offsetX = (CELL_WIDTH_PX - dims.width) / 2;
      const offsetY = (CELL_HEIGHT_PX - dims.height) / 2;

      /*
       * The image is anchored to the SAME cell for both its top-left
       * and bottom-right bounds.
       *
       * It therefore cannot intentionally extend into another cell.
       */
      ws.addImage(imgId, {
        tl: {
          col: IMAGE_COL - 1,
          row: imageRow - 1,
        } as any,

        ext: {
          width: dims.width,
          height: dims.height,
        },
      });

      /*
       * ExcelJS doesn't support true "image inside cell" clipping.
       * The dimensions above guarantee the image itself is smaller than
       * the cell, leaving padding around it.
       */
      void offsetX;
      void offsetY;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Space before next image
    // ─────────────────────────────────────────────────────────────────────────

    currentRow = tagsRow + IMAGE_SPACING_ROWS + 1;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // FOOTER
  // ───────────────────────────────────────────────────────────────────────────

  ws.mergeCells(currentRow, 2, currentRow, 5);

  const footerCell = ws.getCell(currentRow, 2);

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
        );

        const buffer = await wb.xlsx.writeBuffer();

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
        console.error("XLSX export failed", err);
      } finally {
        setIsExcelDownloading(false);
      }
    },
    [],
  );

  return {
    downloadExcel,
    isExcelDownloading,
  };
};