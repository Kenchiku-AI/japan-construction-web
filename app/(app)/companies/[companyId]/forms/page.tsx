import { FC } from "react";
import FormsDashboard from "./FormsDashboard";

interface FormsPageProps {
  params: {
    companyId: string;
  };
}

const FormsPage: FC<FormsPageProps> = async ({ params }) => {
  const { companyId } = await params;

  return <FormsDashboard companyId={companyId} />;
};

export default FormsPage;
