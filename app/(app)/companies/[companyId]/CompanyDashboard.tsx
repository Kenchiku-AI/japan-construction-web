"use client";

import { FC, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { Company, ReportImageTag, UserRole } from "@/types";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useCompany } from "./useCompany";
import { Alert, CreditCard, CreditCardPlus, Edit, LineLogo, Plus } from "@/app/ui/Icons";
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
import { buttonColor, cardClass, errorColor1, fontColor1, fontColor3 } from "@/lib/constants";
import AddPaymentMethodModal from "../../projects/AddPaymentMethodModal";
import { useBillingPlans } from "../../billing-plans/useBillingPlans";
import Select from "@/app/ui/Select/Select";
import { BillingPlan } from "@/types/billingPlans";

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
    updateBillingPlan,
    templates,
    createTemplate,
    removeUser,
  } = useCompany(companyId);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [loadingPaymentMethod, setLoadingPaymentMethod] = useState(false);
  const [paymentMethodClientSecret, setPaymentMethodClientSecret] =
    useState("");
  const [isCreateTagModalShown, setIsCreateTagModalShown] = useState(false);
  const [isCreateTemplateModalShown, setIsCreateTemplateModalShown] =
    useState(false);
  const [editingTag, setEditingTag] = useState<ReportImageTag>();
  const [deletingTag, setDeletingTag] = useState<ReportImageTag>();
  const [showLoader, setShowLoader] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState("");
  const { showModal } = useModal();
  const { billingPlans } = useBillingPlans();
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

  const billingPlanOptions = useMemo(() => {
    if (!billingPlans) return [];

    return [
      { label: t("none"), value: "none" },
      ...billingPlans.map(b => ({
        label: `${b.name} (¥${b.amount_jpy}/${t("month")})`,
        value: b.id
      }))
    ];
  }, [billingPlans]);

  const selectedBillingPlan = useMemo(() => {
    return billingPlans?.find((b) => b.id === company?.billing_plan_id);
  }, [billingPlans, company?.billing_plan_id]);

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
        </>
      )}
      {company && (
        <>
          <div className="flex flex-col">
            {isAdminOrManager && (
              <div className={cardClass}>
                {billingPlans && isAdmin && (
                  <>
                    <Select
                      options={billingPlanOptions}
                      placeholder={t("billing_plan")}
                      value={selectedBillingPlan?.id ?? "none"}
                      onChange={(value) => {
                        updateBillingPlan(value as string);
                      }}
                    />
                    <Divider />
                  </>
                )}
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
                    <div className="flex flex-row gap-2 items-center">
                      <CreditCard color={fontColor1} />
                      <div >
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
                  <MobileDivider />
                  <div className="flex items-center" style={{ color: fontColor3, height: 40 }}>
                    <PaymentLabel company={company} billingPlan={selectedBillingPlan} />
                  </div>
                </div>
                <Divider />
                <div className="flex flex-col md:flex-row w-full justify-between py-1 md:px-3">
                  {!company.line_channel_secret_last4 && (
                    <Button
                      variant="tertiary"
                      label={t("connect_line")}
                      iconLeft={() => <LineLogo color={buttonColor} />}
                      onClick={() => {
                        router.push("/line");
                      }}
                      style={{ height: 40 }}
                    />
                  )}
                </div>
                {/* <Divider style={{ background: fontColor2 }} /> */}
              </div>
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
                      setShowCreateProject(true);
                    }}
                    style={{ height: "auto" }}
                    iconOnlyMobile
                  />
                )}
              </div>
              <div className={cardClass}>
                <CompanyProjectsList
                  projects={company.projects}
                  onClickProject={() => {
                    setShowLoader(true);
                  }}
                />
              </div>
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
              <div className={cardClass}>
                <CompanyUsersList
                  users={company.users}
                  onRemove={(userId) => setUserIdToRemove(userId)}
                  onClickUser={() => {
                    setShowLoader(true);
                  }}
                />
              </div>
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
                <div className={cardClass}>
                  <ReportTemplatesList
                    templates={templates}
                    isEmpty={!companyLoading && templates.length === 0}
                    onClickTemplate={() => {
                      setShowLoader(false);
                    }}
                  />
                </div>
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
                <div className={cardClass}>
                  <TagsList
                    tags={tags ?? []}
                    isEmpty={!tagsLoading && tags?.length === 0}
                    onEdit={(t) => setEditingTag(t)}
                    onDelete={(t) => setDeletingTag(t)}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )
      }
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
      {(showLoader || companyLoading) && <Loader />}
    </>
  );
};

const MobileDivider = () => (
  <div className="py-1">
    <Divider
      style={{
        marginTop: 10,
        marginBottom: 10
      }}
    />
  </div>
);

interface PaymentLabelProps {
  company?: Company;
  billingPlan?: BillingPlan;
}

const PaymentLabel: FC<PaymentLabelProps> = ({ company, billingPlan }) => {
  const { t } = useTranslation();

  if (company?.is_payment_method_valid === false) {
    return (
      <div className="flex gap-2 items-end" style={{ color: errorColor1 }}>
        <Alert color={errorColor1} />
        {t('payment_required')}
      </div>
    );
  }

  const daysLeft = company?.free_trial_days_left ?? 0;

  if (daysLeft > 0) {
    return (
      <>
        {t("free_trial", { days: daysLeft })}
      </>
    )
  }

  if (billingPlan) {
    return (
      <>
        {`${billingPlan.name} (¥${billingPlan.amount_jpy}/${t("month")})`}
      </>
    )
  }

  return (
    <>
      {t("billing_exempt")}
    </>
  )
};

export default CompanyDashboard;
