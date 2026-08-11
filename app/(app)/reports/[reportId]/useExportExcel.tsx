import { useCallback, useState } from "react";
import { saveAs } from "file-saver";
import { Report, Image } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────

const MARGIN_W = 4;

const IMAGE_COL_START = 2;
const IMAGE_COL_END = 4;

const DETAILS_COL_START = 5;
const DETAILS_COL_END = 6;

const IMAGE_COL_WIDTH = 22;
const IMAGE_GAP_COL_WIDTH = 2;
const DETAILS_LABEL_WIDTH = 12;
const DETAILS_VALUE_WIDTH = 42;

const FIELD_LABEL_WIDTH = 22;
const FIELD_VALUE_WIDTH = 60;

const IMAGE_WIDTH_PX = 260;
const IMAGE_PADDING_PX = 8;

const IMAGE_MAX_HEIGHT_PX = 260;

const FIELD_ROW_HEIGHT = 22;
const IMAGE_SPACING_ROWS = 2;

// ─────────────────────────────────────────────────────────────────────────────
// Borders
// ─────────────────────────────────────────────────────────────────────────────

function border(style: "thin" | "medium" = "thin") {
  return {
    style,
    color: {
      argb: "FF000000",
    },
  };
}

const thinBorder = {
  top: border(),
  bottom: border(),
  left: border(),
  right: border(),
};

const outerBorder = {
  top: border("medium"),
  bottom: border("medium"),
  left: border("medium"),
  right: border("medium"),
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

const getImageDimensions = (
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
      width: IMAGE_COL_WIDTH,
    },
    {
      key: "D",
      width: IMAGE_COL_WIDTH,
    },
    {
      key: "E",
      width: DETAILS_LABEL_WIDTH,
    },
    {
      key: "F",
      width: DETAILS_VALUE_WIDTH,
    },
    {
      key: "G",
      width: MARGIN_W,
    },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // Generic styling helper
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

  ws.mergeCells(2, 2, 2, 5);

  const titleCell = ws.getCell(2, 2);
  titleCell.value = report.name;

  style(titleCell, {
    bold: true,
    size: 18,
    vAlign: "middle",
  });

  ws.mergeCells(2, 6, 2, 6);

  const topLabelCell = ws.getCell(2, 6);
  topLabelCell.value = topLabel;

  style(topLabelCell, {
    size: 9,
    hAlign: "right",
    vAlign: "middle",
  });

  // Divider
  for (let col = 2; col <= 6; col++) {
    ws.getCell(4, col).border = {
      bottom: border("medium"),
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
    const labelCell = ws.getCell(currentRow, 2);

    labelCell.value = field.name;

    style(labelCell, {
      bold: false,
      size: 10,
      border: thinBorder,
      vAlign: "middle",
    });

    ws.mergeCells(currentRow, 2, currentRow, 3);

    // Value
    const valueCell = ws.getCell(currentRow, 4);

    valueCell.value = field.value;

    style(valueCell, {
      size: 10,
      border: thinBorder,
      wrap: true,
      vAlign: "middle",
    });

    ws.mergeCells(currentRow, 4, currentRow, 6);

    currentRow++;
  }

  // Add a little space before images
  currentRow += 2;

  // ───────────────────────────────────────────────────────────────────────────
  // IMAGES
  // ───────────────────────────────────────────────────────────────────────────

  const fetchedImages = await Promise.all(
    images.map((image) =>
      fetchImageAsBase64(image.download_url),
    ),
  );

  const pxToPoints = (px: number) => px * 0.75;

  for (let index = 0; index < images.length; index++) {
    const image = images[index];
    const fetched = fetchedImages[index];

    const dims = getImageDimensions(
      image.width,
      image.height,
      IMAGE_WIDTH_PX,
      IMAGE_MAX_HEIGHT_PX,
    );

    // ─────────────────────────────────────────────────────────────────────────
    // Image row
    // ─────────────────────────────────────────────────────────────────────────

    const imageRow = currentRow;

    const imageHeightPx =
      dims.height + IMAGE_PADDING_PX * 2;

    const imageRowHeight = Math.max(
      pxToPoints(imageHeightPx),
      180,
    );

    ws.getRow(imageRow).height = imageRowHeight;

    // Image cell
    ws.mergeCells(
      imageRow,
      IMAGE_COL_START,
      imageRow,
      IMAGE_COL_END,
    );

    const imageCell = ws.getCell(
      imageRow,
      IMAGE_COL_START,
    );

    style(imageCell, {
      border: thinBorder,
    });

    // Details area
    ws.mergeCells(
      imageRow,
      DETAILS_COL_START,
      imageRow,
      DETAILS_COL_END,
    );

    const detailsCell = ws.getCell(
      imageRow,
      DETAILS_COL_START,
    );

    style(detailsCell, {
      border: thinBorder,
    });

    // Add image
    if (fetched) {
      const imgId = wb.addImage({
        base64: fetched.base64,
        extension: fetched.ext,
      });

      const imageColumnWidthPx =
        IMAGE_COL_WIDTH * 7;

      const imageAreaWidthPx =
        imageColumnWidthPx * 3;

      const horizontalOffsetPx =
        Math.max(
          0,
          (imageAreaWidthPx - dims.width) / 2,
        );

      const verticalOffsetPx =
        Math.max(
          0,
          (imageHeightPx - dims.height) / 2,
        );

      const firstColumnWidthPx =
        IMAGE_COL_WIDTH * 7;

      const colFraction =
        horizontalOffsetPx / firstColumnWidthPx;

      const rowFraction =
        pxToPoints(verticalOffsetPx) /
        imageRowHeight;

      ws.addImage(imgId, {
        tl: {
          col: IMAGE_COL_START - 1 + colFraction,
          row: imageRow - 1 + rowFraction,
        } as any,

        ext: {
          width: dims.width,
          height: dims.height,
        },
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Details
    // ─────────────────────────────────────────────────────────────────────────

    const detailStartRow = currentRow;

    // Date
    ws.getRow(detailStartRow).height = 24;

    const dateLabel = ws.getCell(
      detailStartRow,
      DETAILS_COL_START,
    );

    dateLabel.value = "Date";

    style(dateLabel, {
      size: 10,
      border: thinBorder,
    });

    const dateValue = ws.getCell(
      detailStartRow,
      DETAILS_COL_START + 1,
    );

    dateValue.value = new Date(image.created_at);

    dateValue.numFmt = "yyyy/mm/dd";

    style(dateValue, {
      size: 10,
      border: thinBorder,
    });

    // Description
    const descriptionRow = detailStartRow + 1;

    ws.getRow(descriptionRow).height = 60;

    const descriptionLabel = ws.getCell(
      descriptionRow,
      DETAILS_COL_START,
    );

    descriptionLabel.value = "Description";

    style(descriptionLabel, {
      size: 10,
      border: thinBorder,
      vAlign: "top",
    });

    const descriptionValue = ws.getCell(
      descriptionRow,
      DETAILS_COL_START + 1,
    );

    descriptionValue.value = image.description ?? "";

    style(descriptionValue, {
      size: 10,
      border: thinBorder,
      wrap: true,
      vAlign: "top",
    });

    // Tags
    const tagsRow = detailStartRow + 2;

    ws.getRow(tagsRow).height = 40;

    const tagsLabel = ws.getCell(
      tagsRow,
      DETAILS_COL_START,
    );

    tagsLabel.value = "Tags";

    style(tagsLabel, {
      size: 10,
      border: thinBorder,
      vAlign: "top",
    });

    const tagsValue = ws.getCell(
      tagsRow,
      DETAILS_COL_START + 1,
    );

    tagsValue.value = image.tags
      .map((tag) => tag.name)
      .join(", ");

    style(tagsValue, {
      size: 10,
      border: thinBorder,
      wrap: true,
      vAlign: "top",
    });

    // ─────────────────────────────────────────────────────────────────────────
    // Image/details block outline
    // ─────────────────────────────────────────────────────────────────────────

    for (
      let row = imageRow;
      row <= tagsRow;
      row++
    ) {
      for (
        let col = IMAGE_COL_START;
        col <= DETAILS_COL_END;
        col++
      ) {
        const cell = ws.getCell(row, col);

        const isTop = row === imageRow;
        const isBottom = row === tagsRow;
        const isLeft = col === IMAGE_COL_START;
        const isRight = col === DETAILS_COL_END;

        cell.border = {
          top: isTop ? border("medium") : border(),
          bottom: isBottom ? border("medium") : border(),
          left: isLeft ? border("medium") : border(),
          right: isRight ? border("medium") : border(),
        };
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Space before next image
    // ─────────────────────────────────────────────────────────────────────────

    currentRow = tagsRow + IMAGE_SPACING_ROWS + 1;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // FOOTER
  // ───────────────────────────────────────────────────────────────────────────

  ws.mergeCells(
    currentRow,
    2,
    currentRow,
    6,
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
            .replace(/[()]/g, "")
          }.xlsx`,
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
