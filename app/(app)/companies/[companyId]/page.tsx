import { FC } from "react";
import CompanyDashboard from "./CompanyDashboard";

interface CompanyPageProps {
  params: {
    companyId: string;
  };
}

const CompanyPage: FC<CompanyPageProps> = async ({ params }) => {
  const { companyId } = await params;

  return <CompanyDashboard companyId={companyId} />;
};

export default CompanyPage;
