import React from "react";
import MessageListItem from "./MessageListItem";
import { ConversationMessage } from "@/types";

type MessageListProps = {
  messages: ConversationMessage[];
};

function getMessageTimestamp(message: ConversationMessage): string | undefined {
  return message.line_timestamp ?? message.created_at;
}

function getDayKey(timestamp: string | undefined): string | null {
  if (!timestamp) return null;

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDay(timestamp: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date(timestamp));
}

export function MessageList({ messages }: MessageListProps) {
  const textMessages = messages.filter(
    (message) =>
      message.message_type === "text" && Boolean(message.text?.trim()),
  );

  let previousDayKey: string | null = null;

  return (
    <div>
      {textMessages.map((message) => {
        const timestamp = getMessageTimestamp(message);
        const dayKey = getDayKey(timestamp);
        const showDaySeparator =
          dayKey !== null && dayKey !== previousDayKey;

        if (dayKey !== null) {
          previousDayKey = dayKey;
        }

        return (
          <React.Fragment key={message.id}>
            {showDaySeparator && timestamp && (
              <div className="flex items-center gap-3 py-2">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="shrink-0 text-xs text-gray-500">
                  {formatDay(timestamp)}
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>
            )}

            <MessageListItem message={message} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default MessageList;