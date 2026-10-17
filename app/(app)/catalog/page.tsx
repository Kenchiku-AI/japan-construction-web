import { FC } from "react";
import CatalogItemsDashboard from "./CatalogItemsDashboard";

interface CatalogItemsPageProps {
  params: {
    companyId: string;
  };
}

const CatalogItemsPage: FC<CatalogItemsPageProps> = async ({ params }) => {
  const { companyId } = await params;

  return <CatalogItemsDashboard companyId={companyId} />;
};

export default CatalogItemsPage;
