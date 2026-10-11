import { LineUserAvatar } from "@/app/ui/LineUserAvatar";
import { ConversationMessage } from "@/types";
import React from "react";

type MessageListItemProps = {
  message: ConversationMessage;
};

export function MessageListItem({ message }: MessageListItemProps) {
  if (message.message_type !== "text" || !message.text?.trim()) {
    return null;
  }

  const timestamp = message.line_timestamp ?? message.created_at;

  const formattedTime = timestamp
    ? new Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(timestamp))
    : "";

  return (
    <div className="flex items-start gap-3 py-3">
      <LineUserAvatar
        lineUserId={message.sender_line_user_id}
        size={40}
      />

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-sm font-semibold">
            User {message.sender_number}
          </span>

          {formattedTime && (
            <time
              dateTime={timestamp ?? undefined}
              className="text-xs text-gray-500"
            >
              {formattedTime}
            </time>
          )}
        </div>

        <p className="whitespace-pre-wrap break-words text-sm">
          {message.text}
        </p>
      </div>
    </div>
  );
}

export default MessageListItem;