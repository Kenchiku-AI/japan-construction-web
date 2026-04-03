import { FC } from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { Report, Company } from "@/types";
import { bgColor2, fontColor1, fontColor2 } from "@/lib/constants";

interface ReportPDFProps {
  report: Report;
  companyName: string;
}

export const ReportPDF: FC<ReportPDFProps> = ({ report, companyName }) => (
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
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 48,
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
});
