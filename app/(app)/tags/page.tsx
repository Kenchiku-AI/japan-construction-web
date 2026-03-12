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

const ReportTemplatesPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useApi();
  const { tags, updateTag, createTag, loading } = useTags();
  const [isCreateTagModalShown, setIsCreateTagModalShown] = useState(false);
  const [editTag, setEditTag] = useState<ReportImageTag>();

  if (currentUser?.role === UserRole.User) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between mb-10">
        <Heading title={t("tags")} />
        <Button
          variant="secondary"
          label={t("create_tag")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setIsCreateTagModalShown(true);
          }}
        />
      </div>
      <TagsList
        tags={tags ?? []}
        isEmpty={!loading && tags?.length === 0}
        onEdit={(t) => setEditTag(t)}
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
        isOpen={!!editTag}
        tag={editTag}
        onClose={() => {
          setEditTag(undefined);
        }}
        onSubmit={() => {
          setEditTag(undefined);
        }}
      />
    </>
  );
};

export default ReportTemplatesPage;
