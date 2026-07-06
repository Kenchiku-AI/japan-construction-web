"use client";

import { FC, useMemo, useRef, useState } from "react";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { ActionItem, UserRole } from "@/types";
import { Loader } from "@/app/ui/Loader";
import ActionItemsList from "../ActionItemsList";
import CreateActionItemModal from "../CreateActionItemModal";
import EditActionItemModal from "../EditActionItemModal";
import { useProject } from "../useProject";
import { cardClass } from "@/lib/constants";
import DeleteActionItemModal from "../DeleteActionItemModal";
import { Button } from "@/app/ui/Button/Button";
import { Plus } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";

interface ActionItemsProps {
  projectId: string;
}

const ActionItems: FC<ActionItemsProps> = ({ projectId }) => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const {
    project,
    loading,
    createActionItem,
    updateActionItem,
    deleteActionItem
  } = useProject(projectId);
  const [showCreateActionItem, setShowCreateActionItem] = useState(false);
  const [editActionItem, setEditActionItem] = useState<ActionItem>();
  const [actionItemToDelete, setActionItemToDelete] = useState<ActionItem>();

  const topLabel = useMemo(() => {
    if (!isLoaded.current) return "";
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
          title={t("action_items")}
          topLabel={topLabel}
        />
        {isEditable && (
          <Button
            variant="tertiary"
            label={t("create_action_item")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setShowCreateActionItem(true);
            }}
            style={{ height: "auto" }}
            iconOnlyMobile
          />
        )}
      </div>
      <div className={cardClass}>
        <ActionItemsList
          actionItems={project?.action_items ?? []}
          isEmpty={(project?.action_items ?? []).length === 0}
          onClickActionItem={(actionItem) => {
            setEditActionItem(actionItem);
          }}
        />
      </div>
      <CreateActionItemModal
        isOpen={showCreateActionItem}
        onClose={() => {
          setShowCreateActionItem(false);
        }}
        onCreate={(name, description) => {
          setShowCreateActionItem(false);

          createActionItem({
            project_id: projectId,
            name,
            description
          });
        }}
      />
      <EditActionItemModal
        isOpen={!!editActionItem}
        actionItem={editActionItem}
        onClose={() => {
          setEditActionItem(undefined);
        }}
        onSubmit={(request) => {
          if (editActionItem) {
            updateActionItem(
              editActionItem.id,
              request
            );
          }
        }}
        onDelete={(actionItem) => {
          setEditActionItem(undefined);

          setTimeout(() => {
            setActionItemToDelete(actionItem);
          }, 500);
        }}
      />
      <DeleteActionItemModal
        isOpen={!!actionItemToDelete}
        onClose={() => {
          setActionItemToDelete(undefined);
        }}
        onDelete={() => {
          if (actionItemToDelete) {
            deleteActionItem(actionItemToDelete.id);
          }

          setActionItemToDelete(undefined);
        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default ActionItems;
