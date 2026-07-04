"use client";

import { FC, useMemo, useRef, useState } from "react";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { ActionItem } from "@/types";
import Divider from "@/app/ui/Divider";
import { Loader } from "@/app/ui/Loader";
import ActionItemsList from "../ActionItemsList";
import CreateActionItemModal from "../CreateActionItemModal";
import EditActionItemModal from "../EditActionItemModal";
import { useProject } from "../useProject";

interface ActionItemsProps {
  projectId: string;
}

const ActionItems: FC<ActionItemsProps> = ({ projectId }) => {
  const { t } = useTranslation();
  const isLoaded = useRef(false);
  const { project, loading } = useProject(projectId);
  const [showCreateActionItem, setShowCreateActionItem] = useState(false);
  const [editActionItem, setEditActionItem] = useState<ActionItem>();
  const [actionItemToDelete, setActionItemToDelete] = useState<ActionItem>();

  const topLabel = useMemo(() => {
    if (!isLoaded.current) {
      return "";
    }

    return project?.name ?? "";
  }, [isLoaded.current, project?.company_name]);

  return (
    <>
      <Heading
        title={t("action_items")}
        topLabel={topLabel}
      />
      <Divider />
      <ActionItemsList
        actionItems={project?.action_items ?? []}
        isEmpty={(project?.action_items ?? []).length === 0}
        onEdit={(actionItem) => {
          setEditActionItem(actionItem);
        }}
        onDelete={(actionItem) => {
          setActionItemToDelete(actionItem);
        }}
      />
      <CreateActionItemModal
        isOpen={showCreateActionItem}
        onClose={() => {
          setShowCreateActionItem(false);
        }}
        onCreate={(name, description) => {

        }}
      />
      <EditActionItemModal
        isOpen={!!editActionItem}
        actionItem={editActionItem}
        onClose={() => {
          setEditActionItem(undefined);
        }}
        onSubmit={(request) => {

        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default ActionItems;
