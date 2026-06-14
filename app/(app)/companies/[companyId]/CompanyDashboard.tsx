"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { ReportImageTag, UserRole } from "@/types";
import { redirect, useSearchParams } from "next/navigation";
import { useCompany } from "./useCompany";
import { CreditCard, CreditCardPlus, Edit, Plus } from "@/app/ui/Icons";
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
import CreateReportTemplateModal from "../../reports/templates/CreateReportTemplateModal";
import ReportTemplatesList from "../../reports/templates/ReportTemplatesList";
import RemoveUserModal from "./RemoveUserModal";
import { Loader } from "@/app/ui/Loader";
import { fontColor2 } from "@/lib/constants";

interface CompanyDashboardProps {
  companyId: string;
}

const CompanyDashboard: FC<CompanyDashboardProps> = ({ companyId }) => {
  const { currentUser, inviteUser } = useApi();
  const { t } = useTranslation();
  const {
    company,
    createProject,
    updateName,
    templates,
    createTemplate,
    removeUser,
  } = useCompany(companyId);
  const searchParams = useSearchParams();
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [isCreateTagModalShown, setIsCreateTagModalShown] = useState(false);
  const [isCreateTemplateModalShown, setIsCreateTemplateModalShown] =
    useState(false);
  const [editingTag, setEditingTag] = useState<ReportImageTag>();
  const [deletingTag, setDeletingTag] = useState<ReportImageTag>();
  const [showLoader, setShowLoader] = useState(false);
  const [billingExempt, setBillingExempt] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState("");
  const { showModal } = useModal();
  const { tags, updateTag, createTag, deleteTag, loading } = useTags(companyId);
  const isAdmin = currentUser?.role === UserRole.Admin;
  const canCreate = isAdmin || currentUser?.role === UserRole.Manager;

  const shouldRedirect =
    currentUser && !isAdmin && currentUser.company?.id !== companyId;

  useEffect(() => {
    if (loading) return;

    if (billingExempt) {
    } else {
    }
  }, [billingExempt]);

  if (shouldRedirect) {
    redirect("/");
  }

  return (
    <>
      <Heading
        title={company?.name ?? searchParams.get("name") ?? ""}
        topLabel={t("company")}
        placeholder={t("company_name")}
        isEditable={}
        onEdit={(n) => updateName(n)}
      />
      <Divider />
      <div className="flex flex md:flex-row w-full justify-between gap-2 lg:gap-8 py-1">
        {!!company?.has_payment_method ? (
          <Button
            variant="tertiary"
            iconLeft={() => <CreditCardPlus />}
            onClick={() => t("add_payment_method")}
            iconOnlyMobile
          />
        ) : (
          <div className="flex flex-row gap-6">
            <CreditCard />
            <div>{company?.payment_method_name}</div>
            <Button
              variant="tertiary"
              iconLeft={() => <Edit />}
              onClick={() => {}}
              iconOnlyMobile
            />
          </div>
        )}
        <div className="flex flex-row gap-6">
          {(isAdmin || company?.billing_exempt) && (
            <div>{t("billing_exempt")}</div>
          )}
          {isAdmin && (
            <input
              type="checkbox"
              className="toggle"
              checked={billingExempt}
              onChange={() => {
                setBillingExempt(!billingExempt);
              }}
            />
          )}
        </div>
      </div>
      <Divider style={{ background: fontColor2 }} />
      {company && (
        <div className="flex flex-col">
          <div>
            <div className="flex justify-between mt-12">
              <div className="self-end">{t("projects")}</div>
              {canCreate && (
                <Button
                  variant="tertiary"
                  label={t("create_project")}
                  iconLeft={() => <Plus />}
                  onClick={() => {
                    setShowCreateProject(true);
                  }}
                  style={{ height: "auto" }}
                  iconOnlyMobile
                />
              )}
            </div>
            <Divider />
            <CompanyProjectsList
              projects={company.projects}
              onClickProject={() => {
                setShowLoader(true);
              }}
            />
          </div>
          <div>
            <div className="flex justify-between mt-12">
              <div className="self-end">{t("users")}</div>
              {canCreate && (
                <Button
                  variant="tertiary"
                  label={t("invite_user")}
                  iconLeft={() => <Plus />}
                  onClick={() => {
                    setShowInviteUser(true);
                  }}
                  style={{ height: "auto" }}
                  iconOnlyMobile
                />
              )}
            </div>
            <Divider />
            <CompanyUsersList
              users={company.users}
              onRemove={(userId) => setUserIdToRemove(userId)}
              onClickUser={() => {
                setShowLoader(true);
              }}
            />
          </div>
          {isAdmin && (
            <div>
              <div className="flex justify-between mt-12">
                <div className="self-end">{t("report_templates")}</div>
                <Button
                  variant="tertiary"
                  label={t("create_report_template")}
                  iconLeft={() => <Plus />}
                  onClick={() => {
                    setIsCreateTemplateModalShown(true);
                  }}
                  style={{ height: "auto" }}
                  iconOnlyMobile
                />
              </div>
              <Divider />
              <ReportTemplatesList
                templates={templates}
                isEmpty={!loading && templates.length === 0}
                onClickTemplate={() => {
                  setShowLoader(false);
                }}
              />
              <div className="flex justify-between mt-12">
                <div className="self-end">{t("tags")}</div>
                <Button
                  variant="tertiary"
                  label={t("create_tag")}
                  iconLeft={() => <Plus />}
                  onClick={() => {
                    setIsCreateTagModalShown(true);
                  }}
                  style={{ height: "auto" }}
                  iconOnlyMobile
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
      <RemoveUserModal
        isOpen={!!userIdToRemove}
        onClose={() => {
          setUserIdToRemove("");
        }}
        onRemove={() => {
          removeUser(userIdToRemove);
          setUserIdToRemove("");
        }}
      />
      <CreateReportTemplateModal
        isOpen={isCreateTemplateModalShown}
        onClose={() => {
          setIsCreateTemplateModalShown(false);
        }}
        onSubmit={(request) => {
          setIsCreateTemplateModalShown(false);
          createTemplate(request);
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
      {showLoader && <Loader />}
    </>
  );
};

export default CompanyDashboard;
