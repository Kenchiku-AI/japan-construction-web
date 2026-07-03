"use client";

import { FC, useMemo, useRef, useState } from "react";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { WorkItem } from "@/types";
import Divider from "@/app/ui/Divider";
import { Loader } from "@/app/ui/Loader";
import WorkItemsList from "../WorkItemsList";
import CreateWorkItemModal from "../CreateWorkItemModal";
import EditWorkItemModal from "../EditWorkItemModal";
import { useProject } from "../useProject";

interface WorkItemsProps {
  projectId: string;
}

const WorkItems: FC<WorkItemsProps> = ({ projectId }) => {
  const { t } = useTranslation();
  const isLoaded = useRef(false);
  const { project, loading } = useProject(projectId);
  const [showCreateWorkItem, setShowCreateWorkItem] = useState(false);
  const [editWorkItem, setEditWorkItem] = useState<WorkItem>();
  const [workItemToDelete, setWorkItemToDelete] = useState<WorkItem>();

  const topLabel = useMemo(() => {
    if (!isLoaded.current) {
      return "";
    }

    return project?.name ?? "";
  }, [isLoaded.current, project?.company_name]);

  return (
    <>
      <Heading
        title={t("work_items")}
        topLabel={topLabel}
      />
      <Divider />
      <WorkItemsList
        workItems={project?.workItems?.slice(0, 5) ?? []}
        isEmpty={(project?.workItems ?? []).length === 0}
        onEdit={(workItem) => {
          setEditWorkItem(workItem);
        }}
        onDelete={(workItem) => {
          setWorkItemToDelete(workItem);
        }}
      />
      <CreateWorkItemModal
        isOpen={showCreateWorkItem}
        onClose={() => {
          setShowCreateWorkItem(false);
        }}
        onCreate={(name, description) => {

        }}
      />
      <EditWorkItemModal
        isOpen={!!editWorkItem}
        workItem={editWorkItem}
        onClose={() => {
          setEditWorkItem(undefined);
        }}
        onSubmit={(request) => {

        }}
      />
      {loading && <Loader />}
    </>
  );
};

export default WorkItems;
