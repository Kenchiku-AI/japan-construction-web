import { FC } from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { Report, ReportImage } from "@/types";
import { bgColor2, fontColor1, fontColor2 } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { useDate } from "@/public/date/useDate";

interface ReportPDFProps {
  report: Report;
  companyName: string;
  images: ReportImage[];
}

Font.register({
  family: "KosugiMaru",
  src: "/fonts/KosugiMaru-Regular.ttf",
});

const PAGE_CONTENT_WIDTH = 499;
const MAX_IMAGE_HEIGHT = 600;

export const ReportPDF: FC<ReportPDFProps> = ({
  report,
  companyName,
  images,
}) => {
  const { t } = useTranslation();
  const { formatDate } = useDate();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.companyName}>{companyName}</Text>
        <Text style={styles.title}>{report.name}</Text>
        <View style={styles.divider} />
        {report.fields.map((f) => (
          <View key={f.id} style={styles.field} wrap={false}>
            <Text style={styles.fieldName}>{f.name}</Text>
            <Text style={styles.fieldValue}>{f.value}</Text>
          </View>
        ))}
        {images.map((image) => {
          const dims = getImageDimensions(image.width, image.height);

          return (
            <View key={image.id} style={styles.imageContainer} wrap={false}>
              <Image
                src={image.download_url}
                style={{ width: dims.width, height: dims.height }}
              />
              <View style={styles.imageInfo}>
                <View style={styles.imageInfoRow}>
                  <Text style={styles.imageInfoLabel}>{t("date_taken")}</Text>
                  <Text style={styles.imageInfoValue}>
                    {formatDate(image.created_at)}
                  </Text>
                </View>
                {!!image.description?.length && (
                  <View style={styles.imageInfoRow}>
                    <Text style={styles.imageInfoLabel}>
                      {t("description")}
                    </Text>
                    <Text style={styles.imageInfoValue}>
                      {image.description}
                    </Text>
                  </View>
                )}
                {!!image.tags?.length && (
                  <View style={styles.imageInfoRow}>
                    <Text style={styles.imageInfoLabel}>{t("tags")}</Text>
                    <Text style={styles.imageInfoValue}>
                      {image.tags.map((tag) => tag.name).join(", ")}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </Page>
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
    fontFamily: "KosugiMaru",
  },
  companyName: {
    fontSize: 12,
    color: fontColor2,
    marginBottom: 8,
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
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: bgColor2,
    minHeight: 46,
  },
  fieldName: {
    fontSize: 10,
    color: fontColor2,
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 12,
    color: fontColor1,
  },
  imageContainer: {
    alignItems: "center",
  },
  imageInfo: {
    width: "100%",
    marginTop: 8,
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: fontColor2,
  },
  imageInfoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: fontColor2,
    paddingVertical: 5,
  },
  imageInfoLabel: {
    fontSize: 10,
    color: fontColor2,
    width: "30%",
  },
  imageInfoValue: {
    fontSize: 10,
    color: fontColor1,
    width: "70%",
  },
});
