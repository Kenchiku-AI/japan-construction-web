import { FC } from "react";
import CustomObjectDefinitionDashboard from "./CustomObjectDefinitionDashboard";

interface CustomObjectDefinitionPageProps {
  params: {
    customObjectDefinitionId: string;
  };
}

const CustomObjectDefinitionPage: FC<CustomObjectDefinitionPageProps> = async ({ params }) => {
  const { customObjectDefinitionId } = await params;

  return <CustomObjectDefinitionDashboard customObjectDefinitionId={customObjectDefinitionId} />;
};

export default CustomObjectDefinitionPage;
