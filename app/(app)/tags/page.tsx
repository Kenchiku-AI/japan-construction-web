"use client";

import { useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { Plus } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";
import { ReportImageTag, UserRole } from "@/types";
import TagsList from "./TagsList";
import { redirect } from "next/navigation";
import { useTags } from "./useTags";
import CreateTagModal from "./CreateTagModal";
import UpdateTagModal from "./UpdateTagModal";
import DeleteTagModal from "./DeleteTagModal";
import Divider from "@/app/ui/Divider";

const ReportTemplatesPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const { tags, updateTag, createTag, deleteTag, loading } = useTags(
    currentUser?.company?.id,
  );
  const [isCreateTagModalShown, setIsCreateTagModalShown] = useState(false);
  const [editingTag, setEditingTag] = useState<ReportImageTag>();
  const [deletingTag, setDeletingTag] = useState<ReportImageTag>();

  if (currentUser?.role === UserRole.User) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("tags")} />
        <Button
          variant="tertiary"
          style={{ height: "auto" }}
          label={t("create_tag")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setIsCreateTagModalShown(true);
          }}
        />
      </div>
      <Divider />
      <TagsList
        tags={tags ?? []}
        isEmpty={!loading && tags?.length === 0}
        onEdit={(t) => setEditingTag(t)}
        onDelete={(t) => setDeletingTag(t)}
      />
      <CreateTagModal
        isOpen={isCreateTagModalShown}
        onClose={() => {
          setIsCreateTagModalShown(false);
        }}
        onSubmit={(name, description) => {
          setIsCreateTagModalShown(false);
          createTag({ name, description });
        }}
      />
      <UpdateTagModal
        isOpen={!!editingTag}
        tag={editingTag}
        onClose={() => {
          setEditingTag(undefined);
        }}
        onSubmit={(name, description) => {
          if (!editingTag) return;

          const tagId = editingTag.id;
          setEditingTag(undefined);
          updateTag(tagId, {
            name,
            description,
          });
        }}
      />
      <DeleteTagModal
        isOpen={!!deletingTag}
        onClose={() => {
          setDeletingTag(undefined);
        }}
        onDelete={() => {
          if (!deletingTag) return;

          const tagId = deletingTag.id;
          setDeletingTag(undefined);
          deleteTag(tagId);
        }}
      />
    </>
  );
};

export default ReportTemplatesPage;
