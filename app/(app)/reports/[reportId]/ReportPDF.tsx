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
const MAX_IMAGE_HEIGHT = 580;

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
      </Page>
      {images.map((image, index) => {
        const dims = getImageDimensions(image.width, image.height);

        return (
          <Page size="A4" key={image.id} style={styles.page}>
            <PDFImage
              src={image.download_url}
              style={{ width: dims.width, height: dims.height }}
            />
            <View style={styles.fields}>
              <View
                style={{
                  ...styles.row,
                  marginTop: 16,
                }}
              >
                <Text style={{ ...styles.label, width: 76 }}>
                  {t("date_taken")}
                </Text>
                <Text style={styles.value}>{formatDate(image.created_at)}</Text>
              </View>
              <View
                style={{
                  ...styles.row,
                  borderTopWidth: 0.5,
                }}
              >
                <Text style={{ ...styles.label, width: 76 }}>
                  {t("description")}
                </Text>
                <Text style={styles.value}>{image.description}</Text>
              </View>
              <View
                style={{
                  ...styles.row,
                  borderTopWidth: 0.5,
                }}
              >
                <Text style={{ ...styles.label, width: 76 }}>{t("tags")}</Text>
                <Text style={styles.value}>
                  {image.tags.map((tag) => tag.name).join(", ")}
                </Text>
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

const getImageDimensions = (width: number, height: number) => {
  const aspectRatio = width / height;

  let displayWidth = Math.min(width, PAGE_CONTENT_WIDTH);
  let displayHeight = displayWidth / aspectRatio;

  if (displayHeight > MAX_IMAGE_HEIGHT) {
    displayHeight = MAX_IMAGE_HEIGHT;
    displayWidth = displayHeight * aspectRatio;
  }

  return { width: displayWidth, height: displayHeight };
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
});
