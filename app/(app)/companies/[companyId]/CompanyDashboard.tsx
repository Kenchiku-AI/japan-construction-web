"use client";

import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { ReportImageTag, UserRole } from "@/types";
import { redirect, useSearchParams } from "next/navigation";
import { useCompany } from "./useCompany";
import { Plus } from "@/app/ui/Icons";
import InviteUserModal from "./InviteUserModal";
import CompanyUsersList from "./CompanyUsersList";
import CreateProjectModal from "./CreateProjectModal";
import CompanyProjectsList from "./CompanyProjectsList";
import Divider from "@/app/ui/Divider";
import { useModal } from "@/lib/modal/ModalContext";
import TagsList from "../../tags/TagsList";
import { useTags } from "../../tags/useTags";
import UpdateTagModal from "../../tags/UpdateTagModal";
import DeleteTagModal from "../../tags/DeleteTagModal";
import CreateTagModal from "../../tags/CreateTagModal";

interface CompanyDashboardProps {
  companyId: string;
}

const CompanyDashboard: FC<CompanyDashboardProps> = ({ companyId }) => {
  const { currentUser, inviteUser } = useApi();
  const { t } = useTranslation();
  const { company, createProject, updateName } = useCompany(companyId);
  const searchParams = useSearchParams();
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [isCreateTagModalShown, setIsCreateTagModalShown] = useState(false);
  const [editingTag, setEditingTag] = useState<ReportImageTag>();
  const [deletingTag, setDeletingTag] = useState<ReportImageTag>();
  const { showModal } = useModal();
  const { tags, updateTag, createTag, deleteTag, loading } = useTags(companyId);

  const shouldRedirect =
    currentUser &&
    currentUser.role !== UserRole.Admin &&
    currentUser.company?.id !== companyId;

  if (shouldRedirect) {
    redirect("/");
  }

  return (
    <>
      <Heading
        title={company?.name ?? searchParams.get("name") ?? ""}
        topLabel={t("company")}
        placeholder={t("company_name")}
        isEditable={currentUser?.role === UserRole.Admin}
        onEdit={(n) => updateName(n)}
      />
      {company && (
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex justify-between mt-8">
              <div className="self-end">{t("projects")}</div>
              {currentUser?.role === UserRole.Admin && (
                <Button
                  variant="tertiary"
                  label={t("create_project")}
                  iconLeft={() => <Plus />}
                  onClick={() => {
                    setShowCreateProject(true);
                  }}
                  style={{ height: "auto" }}
                />
              )}
            </div>
            <Divider />
            <CompanyProjectsList projects={company.projects} />
          </div>
          <div>
            <div className="flex justify-between">
              <div className="self-end">{t("users")}</div>
              {(currentUser?.role === UserRole.Admin ||
                currentUser?.role === UserRole.Manager) && (
                <Button
                  variant="tertiary"
                  label={t("invite_user")}
                  iconLeft={() => <Plus />}
                  onClick={() => {
                    setShowInviteUser(true);
                  }}
                  style={{ height: "auto" }}
                />
              )}
            </div>
            <Divider />
            <CompanyUsersList users={company.users} />
          </div>
          {currentUser?.role === "admin" && (
            <div>
              <div className="flex justify-between">
                <div className="self-end">{t("tags")}</div>
                <Button
                  variant="tertiary"
                  label={t("create_tag")}
                  iconLeft={() => <Plus />}
                  onClick={() => {
                    setIsCreateTagModalShown(true);
                  }}
                  style={{ height: "auto" }}
                />
              </div>
              <Divider />
              <TagsList
                tags={tags ?? []}
                isEmpty={!loading && tags?.length === 0}
                onEdit={(t) => setEditingTag(t)}
                onDelete={(t) => setDeletingTag(t)}
              />
            </div>
          )}
        </div>
      )}
      <InviteUserModal
        isOpen={showInviteUser}
        onClose={() => {
          setShowInviteUser(false);
        }}
        onSubmit={async (email, role) => {
          setShowInviteUser(false);

          try {
            await inviteUser({
              email,
              role,
              company_id: companyId,
            });
            showModal({
              title: t("invitation_sent"),
              subtitle: t("invitation_sent_description"),
            });
          } catch (err) {
            showModal({
              title: t("error"),
              subtitle: t("invitation_send_error_description"),
            });
          }
        }}
      />
      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => {
          setShowCreateProject(false);
        }}
        onSubmit={async (name, description) => {
          setShowCreateProject(false);

          try {
            await createProject(name, description);
          } catch (err) {}
        }}
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

export default CompanyDashboard;
