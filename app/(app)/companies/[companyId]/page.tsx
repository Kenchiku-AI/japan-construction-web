import { FC } from "react";

interface CompanyPageProps {
  params: {
    companyId: string;
  };
}

const CompanyPage: FC<CompanyPageProps> = ({ params }) => {
  return <div>Company ID: {params.companyId}</div>;
};

export default CompanyPage;
