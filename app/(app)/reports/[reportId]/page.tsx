import { FC } from "react";
import ReportDashboard from "./ReportDashboard";

interface ReportPageProps {
  params: {
    reportId: string;
  };
}

const ReportPage: FC<ReportPageProps> = async ({ params }) => {
  const { reportId } = await params;

  return <ReportDashboard reportId={reportId} />;
};

export default ReportPage;
