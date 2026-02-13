import { FC } from "react";
import ReportTemplateDashboard from "./ReportTemplateDashboard";

interface ReportPageProps {
  params: {
    reportTemplateId: string;
  };
}

const ReportTemplatePage: FC<ReportPageProps> = async ({ params }) => {
  const { reportTemplateId } = await params;

  return <ReportTemplateDashboard reportTemplateId={reportTemplateId} />;
};

export default ReportTemplatePage;
