import { FC } from "react";
import ConversationItems from "./ConversationItems";

interface ConversationItemsPageProps {
  params: {
    projectId: string;
  };
}

const ConversationItemsPage: FC<ConversationItemsPageProps> = async ({ params }) => {
  const { projectId } = await params;

  return <ConversationItems projectId={projectId} />;
};

export default ConversationItemsPage;
