import { FC } from "react";
import CustomInfoDashboard from "./CustomInfoDashboard";

interface CustomInfoPageProps {
  params: {
    companyId: string;
  };
}

const CustomInfoPage: FC<CustomInfoPageProps> = async ({ params }) => {
  const { companyId } = await params;

  return <CustomInfoDashboard companyId={companyId} />;
};

export default CustomInfoPage;
