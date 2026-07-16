"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { ConversationItem, UserRole } from "@/types";
import { Loader } from "@/app/ui/Loader";
import ConversationItemsList from "../ConversationItemsList";
import CreateConversationItemModal from "../CreateConversationItemModal";
import EditConversationItemModal from "../EditConversationItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { useProject } from "../useProject";
import { cardClass } from "@/lib/constants";
import { Button } from "@/app/ui/Button/Button";
import { Plus } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter, useSearchParams } from "next/navigation";

interface ConversationItemsProps {
  projectId: string;
}

const ConversationItems: FC<ConversationItemsProps> = ({ projectId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationItemTypeId = searchParams.get("conversationItemTypeId");
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const {
    project,
    loading,
    getConversationItems,
    createConversationItem,
    updateConversationItem,
    deleteConversationItem
  } = useProject(projectId);
  const [title, setTitle] = useState("");
  const [conversationItems, setConversationItems] = useState<ConversationItem[]>([]);
  const [showCreateConversationItem, setShowCreateConversationItem] = useState(false);
  const [editConversationItem, setEditConversationItem] = useState<ConversationItem>();
  const [conversationItemToDelete, setConversationItemToDelete] = useState<ConversationItem>();

  const refresh = useCallback(async () => {
    if (!conversationItemTypeId) {
      router.replace(`/projects/${projectId}`);
      return;
    }

    const response = await getConversationItems(conversationItemTypeId);

    if (response) {
      setTitle(response.conversation_item_type_name);
      setConversationItems(response.items);
    }
  }, [conversationItemTypeId])

  useEffect(() => {
    refresh();
  }, [conversationItemTypeId, router, refresh]);

  const topLabel = useMemo(() => {
    return project?.name ?? "";
  }, [project?.name]);

  const isEditable = useMemo(() => {
    if (currentUser?.role === UserRole.Admin) return true;
    if (project?.status !== "active") return false;
    return currentUser?.role === UserRole.Manager;
  }, [project?.status, currentUser?.role]);

  return (
    <>
      <div className="flex justify-between items-end">
        <Heading
          title={title}
          topLabel={topLabel}
        />
        {isEditable && (
          <Button
            variant="tertiary"
            label={t("create")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setShowCreateConversationItem(true);
            }}
            style={{ height: "auto" }}
            iconOnlyMobile
          />
        )}
      </div>
      <div className={cardClass}>
        <ConversationItemsList
          conversationItems={conversationItems}
          isEmpty={conversationItems.length === 0}
          onClickConversationItem={(conversationItem) => {
            setEditConversationItem(conversationItem);
          }}
        />
      </div>
      <CreateConversationItemModal
        isOpen={!!showCreateConversationItem}
        title={t("create")}
        onClose={() => {
          setShowCreateConversationItem(false);
        }}
        onCreate={async (name, description) => {
          if (conversationItemTypeId) {
            await createConversationItem({
              project_id: projectId,
              conversation_item_type_id: conversationItemTypeId,
              name,
              description
            });
            refresh();
          }

          setShowCreateConversationItem(false);
        }}
      />
      <EditConversationItemModal
        isOpen={!!editConversationItem}
        title={t('edit')}
        conversationItem={editConversationItem}
        onClose={() => {
          setEditConversationItem(undefined);
        }}
        onSubmit={async (request) => {
          if (editConversationItem) {
            await updateConversationItem(
              editConversationItem.id,
              request
            );
            refresh();
          }
        }}
        onDelete={(conversationItem) => {
          setEditConversationItem(undefined);

          setTimeout(() => {
            setConversationItemToDelete(conversationItem);
          }, 500);
        }}
      />
      <ConfirmDeleteModal
        isOpen={!!conversationItemToDelete}
        onClose={() => {
          setConversationItemToDelete(undefined);
        }}
        onDelete={async () => {
          if (conversationItemToDelete) {
            await deleteConversationItem(conversationItemToDelete.id);
            refresh();
          }

          setConversationItemToDelete(undefined);
        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default ConversationItems;
