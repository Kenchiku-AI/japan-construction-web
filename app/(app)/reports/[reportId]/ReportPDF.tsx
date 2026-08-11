import { FC } from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image as PDFImage,
} from "@react-pdf/renderer";
import { Report, Image } from "@/types";
import { fontColor1, fontColor2 } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { useDate } from "@/public/date/useDate";

interface ReportPDFProps {
  report: Report;
  topLabel: string;
  images: Image[];
  labelWidth: number;
}

Font.register({
  family: "NotoSansJP",
  src: "/fonts/NotoSansJP-Regular.ttf",
});

const PAGE_CONTENT_WIDTH = 499;
const IMAGE_COLUMN_WIDTH = 260;
const IMAGE_GAP = 16;
const DETAILS_COLUMN_WIDTH =
  PAGE_CONTENT_WIDTH - IMAGE_COLUMN_WIDTH - IMAGE_GAP;

const MAX_IMAGE_HEIGHT = 260;

export const ReportPDF: FC<ReportPDFProps> = ({
  report,
  topLabel,
  images,
  labelWidth,
}) => {
  const { t } = useTranslation();
  const { formatDate } = useDate();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.topLabel}>{topLabel}</Text>
        <Text style={styles.title}>{report.name}</Text>
        <View style={styles.divider} />

        <View style={styles.fields}>
          {report.fields.map((field, index) => (
            <View
              key={field.id}
              style={{
                ...styles.row,
                borderTopWidth: index === 0 ? 0 : 0.5,
              }}
            >
              <Text style={{ ...styles.label, width: labelWidth }}>
                {field.name}
              </Text>
              <Text style={styles.value}>{field.value}</Text>
            </View>
          ))}
        </View>

        {/* Images */}
        <View style={styles.imageList}>
          {images.map((image) => {
            const dims = getImageDimensions(
              image.width,
              image.height,
              IMAGE_COLUMN_WIDTH,
              MAX_IMAGE_HEIGHT
            );

            return (
              <View key={image.id} style={styles.imageItem} wrap={false}>
                {/* Image */}
                <View style={styles.imageColumn}>
                  <PDFImage
                    src={image.download_url}
                    style={{
                      width: dims.width,
                      height: dims.height,
                    }}
                  />
                </View>

                {/* Details */}
                <View style={styles.detailsColumn}>
                  <View style={styles.row}>
                    <Text style={styles.detailLabel}>
                      {t("date_taken")}
                    </Text>
                    <Text style={styles.detailValue}>
                      {formatDate(image.created_at)}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.row,
                      borderTopWidth: 0.5,
                    }}
                  >
                    <Text style={styles.detailLabel}>
                      {t("description")}
                    </Text>
                    <Text style={styles.detailValue}>
                      {image.description}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.row,
                      borderTopWidth: 0.5,
                    }}
                  >
                    <Text style={styles.detailLabel}>
                      {t("tags")}
                    </Text>
                    <Text style={styles.detailValue}>
                      {image.tags.map((tag) => tag.name).join(", ")}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

const getImageDimensions = (
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
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

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "NotoSansJP",
  },

  topLabel: {
    fontSize: 12,
    color: fontColor2,
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    color: fontColor1,
    marginBottom: 12,
  },

  divider: {
    height: 1,
    backgroundColor: fontColor2,
    width: "100%",
  },

  fields: {
    width: "100%",
  },

  imageList: {
    width: "100%",
    marginTop: 32,
  },

  imageItem: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 32,
  },

  imageColumn: {
    width: IMAGE_COLUMN_WIDTH,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  detailsColumn: {
    width: DETAILS_COLUMN_WIDTH,
    marginLeft: IMAGE_GAP,
  },

  row: {
    flexDirection: "row",
    borderTopColor: fontColor2,
    padding: 12,
  },

  label: {
    fontSize: 12,
    color: fontColor2,
    width: "20%",
  },

  value: {
    fontSize: 12,
    color: fontColor1,
    width: "80%",
  },

  detailLabel: {
    fontSize: 12,
    color: fontColor2,
    width: 50,
  },

  detailValue: {
    fontSize: 12,
    color: fontColor1,
    width: DETAILS_COLUMN_WIDTH - 50 - 24,
  },
});