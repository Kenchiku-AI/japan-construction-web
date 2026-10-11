import { FC } from "react";
import ConversationMessages from "./ConversationMessages";

interface ConversationMessagesPageProps {
  params: {
    conversationId: string;
  };
}

const ConversationMessagesPage: FC<ConversationMessagesPageProps> = async ({ params }) => {
  const { conversationId } = await params;

  return <ConversationMessages conversationId={conversationId} />;
};

export default ConversationMessagesPage;
