"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { ReportImageTag, UserRole } from "@/types";
import { redirect, useSearchParams } from "next/navigation";
import { useCompany } from "./useCompany";
import { CreditCard, CreditCardPlus, Edit, LineLogo, Plus } from "@/app/ui/Icons";
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
import { buttonColor, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import AddPaymentMethodModal from "../../projects/AddPaymentMethodModal";
import BillingEnabledModal from "./BillingEnabledModal";
import LineChannelSecretModal from "./LineChannelSecretModal";
import LineWebhookButton from "./LineWebhookButton";
import LineWebhookModal from "./LineWebhookModal";

interface CompanyDashboardProps {
  companyId: string;
}

const CompanyDashboard: FC<CompanyDashboardProps> = ({ companyId }) => {
  const { currentUser, inviteUser, setupIntent, refreshCurrentUser } = useApi();
  const { t } = useTranslation();
  const {
    loading: companyLoading,
    company,
    getCompany,
    createProject,
    updateName,
    updateBillingExempt,
    updateLineChannelSecret,
    templates,
    createTemplate,
    removeUser,
  } = useCompany(companyId);
  const searchParams = useSearchParams();
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showLineSecret, setShowLineSecret] = useState(false);
  const [loadingPaymentMethod, setLoadingPaymentMethod] = useState(false);
  const [paymentMethodClientSecret, setPaymentMethodClientSecret] =
    useState("");
  const [isCreateTagModalShown, setIsCreateTagModalShown] = useState(false);
  const [isCreateTemplateModalShown, setIsCreateTemplateModalShown] =
    useState(false);
  const [pendingBillingEnabled, setPendingBillingEnabled] = useState<
    boolean | null
  >(null);
  const [editingTag, setEditingTag] = useState<ReportImageTag>();
  const [deletingTag, setDeletingTag] = useState<ReportImageTag>();
  const [showLineWebhook, setShowLineWebhook] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState("");
  const { showModal } = useModal();
  const {
    tags,
    updateTag,
    createTag,
    deleteTag,
    loading: tagsLoading,
  } = useTags(companyId);
  const isAdmin = currentUser?.role === UserRole.Admin;
  const isAdminOrManager = isAdmin || currentUser?.role === UserRole.Manager;
  const companyName = company?.name ?? searchParams.get("name") ?? "";
  const paymentMethodColor = company?.is_payment_method_valid ? fontColor1 : errorColor1;

  const shouldRedirect =
    currentUser && !isAdmin && currentUser.company?.id !== companyId;

  if (shouldRedirect) {
    redirect("/");
  }

  const onClickPaymentMethod = async () => {
    setLoadingPaymentMethod(true);

    try {
      const response = await setupIntent(companyId);

      if (response) {
        setPaymentMethodClientSecret(response.client_secret);
      }
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoadingPaymentMethod(false);
  };

  return (
    <>
      {!!companyName && (
        <>
          <Heading
            title={companyName}
            topLabel={t("company")}
            placeholder={t("company_name")}
            isEditable={isAdminOrManager}
            onEdit={(n) => updateName(n)}
          />
          <Divider />
        </>
      )}
      {company && (
        <>
          <div className="flex flex-col">
            {isAdminOrManager && (
              <>
                <div className="flex flex-col md:flex-row w-full justify-between py-1 md:px-3">
                  {!company.payment_method_name ? (
                    <Button
                      variant="tertiary"
                      label={
                        loadingPaymentMethod
                          ? `${t("loading")}...`
                          : t("add_payment_method")
                      }
                      iconLeft={() => <CreditCardPlus />}
                      onClick={onClickPaymentMethod}
                      disabled={loadingPaymentMethod}
                      style={{ height: 40 }}
                    />
                  ) : (
                    <div className="flex flex-row gap-4 items-center">
                      <CreditCard color={paymentMethodColor} />
                      <div style={{ color: paymentMethodColor }}>
                        {`${t("payment_method")}: ${company.payment_method_name}`}
                      </div>
                      <Button
                        variant="tertiary"
                        iconLeft={() => <Edit />}
                        onClick={onClickPaymentMethod}
                        disabled={loadingPaymentMethod}
                      />
                    </div>
                  )}
                  {(!isAdmin && company.billing_exempt) && (
                    <>
                      <MobileDivider />
                      <div className="flex items-center" style={{ color: fontColor2, height: 40 }}>
                        {t("billing_exempt")}
                      </div>
                    </>
                  )}
                  {isAdmin && (
                    <>
                      <MobileDivider />
                      <label
                        style={{ height: 40 }}
                        className={`flex items-center gap-3${isAdmin ? " cursor-pointer" : ""}`}
                      >
                        <div style={{ color: fontColor1 }}>{t("billing_enabled")}</div>
                        {isAdmin && (
                          <input
                            type="checkbox"
                            className="toggle toggle-md"
                            checked={!company.billing_exempt}
                            onChange={(e) => setPendingBillingEnabled(e.target.checked)}
                          />
                        )}
                      </label>
                    </>
                  )}
                </div>
                <Divider style={{ background: fontColor2 }} />
                <div className="flex flex-col md:flex-row w-full justify-between py-1 md:px-3">
                  {!company.line_channel_secret_last4 ? (
                    <Button
                      variant="tertiary"
                      label={t("connect_line")}
                      iconLeft={() => <LineLogo color={buttonColor} />}
                      onClick={() => {
                        setShowLineSecret(true);
                      }}
                      style={{ height: 40 }}
                    />
                  ) : (
                    <>
                      <div className="flex flex-row gap-2 items-center">
                        <LineLogo color={fontColor1} />
                        <div>
                          {`${t("line_channel_secret")}: ••••${company.line_channel_secret_last4}`}
                        </div>
                        <Button
                          variant="tertiary"
                          iconLeft={() => <Edit />}
                          onClick={() => {
                            setShowLineSecret(true);
                          }}
                        />
                      </div>
                      <MobileDivider />
                      <LineWebhookButton companyId={companyId} />
                    </>
                  )}
                </div>
                <Divider style={{ background: fontColor2 }} />
              </>
            )}
            <div>
              <div className="flex justify-between mt-12">
                <div className="self-end">{t("projects")}</div>
                {isAdminOrManager && (
                  <Button
                    variant="tertiary"
                    label={t("create_project")}
                    iconLeft={() => <Plus />}
                    onClick={() => {
                      if (!isAdmin && currentUser?.company?.needs_payment_method) {
                        showModal({
                          title: t("payment_method_required"),
                          subtitle: t("payment_method_required_description")
                        });
                        return;
                      }

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
                {isAdminOrManager && (
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
                  isEmpty={!companyLoading && templates.length === 0}
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
                  isEmpty={!tagsLoading && tags?.length === 0}
                  onEdit={(t) => setEditingTag(t)}
                  onDelete={(t) => setDeletingTag(t)}
                />
              </div>
            )}
          </div>
        </>
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
          } catch (err) { }
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
      <AddPaymentMethodModal
        clientSecret={paymentMethodClientSecret}
        isOpen={!!paymentMethodClientSecret}
        onClose={() => setPaymentMethodClientSecret("")}
        onSuccess={() => {
          setPaymentMethodClientSecret("");
          getCompany(companyId);
          refreshCurrentUser();
        }}
      />
      <BillingEnabledModal
        isOpen={pendingBillingEnabled !== null}
        isEnabled={pendingBillingEnabled ?? true}
        onClose={() => {
          setPendingBillingEnabled(null)
        }}
        onConfirm={async () => {
          if (pendingBillingEnabled === null) return;

          const value = pendingBillingEnabled;
          setPendingBillingEnabled(null);

          try {
            await updateBillingExempt(!value);
            await getCompany(companyId);
          } catch (err) {
            showModal({
              title: t("error"),
              subtitle: t("error_description"),
            });
          }
        }}
      />
      <LineChannelSecretModal
        isOpen={showLineSecret}
        onClose={() => {
          setShowLineSecret(false);
        }}
        onSubmit={async (secret) => {
          const shouldShowWebhook = !company?.line_channel_secret_last4;

          const success = await updateLineChannelSecret(secret);

          if (success && shouldShowWebhook) {
            setShowLineWebhook(true);
          }
        }}
      />
      <LineWebhookModal
        companyId={companyId}
        isOpen={showLineWebhook}
        onClose={() => {
          setShowLineWebhook(false);
        }}
      />
      {(showLoader || companyLoading) && <Loader />}
    </>
  );
};

const MobileDivider = () => (
  <div className="py-1">
    <Divider
      style={{
        marginTop: 10,
        marginBottom: 10,
        background: fontColor2,
      }}
    />
  </div>
);

export default CompanyDashboard;
