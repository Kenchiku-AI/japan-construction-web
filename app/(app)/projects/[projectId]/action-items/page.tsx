import { FC } from "react";
import ActionItems from "./ActionItems";

interface ActionItemsPageProps {
  params: {
    projectId: string;
  };
}

const ActionItemsPage: FC<ActionItemsPageProps> = async ({ params }) => {
  const { projectId } = await params;

  return <ActionItems projectId={projectId} />;
};

export default ActionItemsPage;
