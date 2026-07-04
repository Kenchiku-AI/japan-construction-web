"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { CompanyGuest, UserRole, ActionItem } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useProject } from "./useProject";
import { Check, Close, Download, Plus } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import CreateReportModal from "../../reports/CreateReportModal";
import { useReportTemplates } from "../../reports/templates/useReportTemplates";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import ReportsList from "../../reports/ReportsList";
import { errorColor1, fontColor2 } from "@/lib/constants";
import Select from "@/app/ui/Select/Select";
import DownloadExcelModal from "../../reports/DownloadExcelModal";
import { useExport } from "../../reports/useExport";
import GuestsList from "./GuestsList";
import AddGuestModal from "./AddGuestModal";
import RemoveGuestModal from "./RemoveGuestModal";
import { Loader } from "@/app/ui/Loader";
import { useModal } from "@/lib/modal/ModalContext";
import LineLinkCodeButton from "../../../ui/LineLinkCodeButton";
import ActionItemsList from "./ActionItemsList";
import CreateActionItemModal from "./CreateActionItemModal";
import EditActionItemModal from "./EditActionItemModal";

interface ProjectDashboardProps {
  projectId: string;
}

const ProjectDashboard: FC<ProjectDashboardProps> = ({ projectId }) => {
  const router = useRouter();
  const { currentUser } = useApi();
  const { reportTemplates, getReportTemplates } = useReportTemplates();
  const { t } = useTranslation();
  const {
    project,
    updateProject,
    createReport,
    statusOptions,
    projectGuests,
    nonProjectGuests,
    getCompanyGuests,
    inviteGuest,
    removeGuest,
  } = useProject(projectId);
  const { downloadExcel } = useExport();
  const isLoaded = useRef(false);
  const searchParams = useSearchParams();
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [showDownloadExcel, setShowDownloadExcel] = useState(false);
  const [isExcelDownloading, setIsExcelDownloading] = useState(false);
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [showCreateActionItem, setShowCreateActionItem] = useState(false);
  const [editActionItem, setEditActionItem] = useState<ActionItem>();
  const [actionItemToDelete, setActionItemToDelete] = useState<ActionItem>();
  const [showLoader, setShowLoader] = useState(false);
  const [guestToRemove, setGuestToRemove] = useState<CompanyGuest>();
  const { showModal } = useModal();

  useEffect(() => {
    if (isLoaded.current || !project) return;

    isLoaded.current = true;
    setDescription(project.description);
    setStatus(project.status);

    const isAdmin = currentUser?.role === "admin";
    const companyId = isAdmin ? project.company_id : undefined;
    getReportTemplates(companyId);

    getCompanyGuests(project.company_id);
  }, [project, currentUser]);

  const isEdited = useMemo(() => {
    if (!isLoaded.current) return false;

    if (project?.description !== description) return true;

    if (currentUser?.role === "admin") {
      return project?.status !== status;
    }

    return false;
  }, [
    description,
    status,
    isLoaded.current,
    project?.description,
    project?.status,
    currentUser?.role,
  ]);

  const isEditable = useMemo(() => {
    if (currentUser?.role === UserRole.Admin) return true;
    if (project?.status !== "active") return false;
    return currentUser?.role === UserRole.Manager;
  }, [project?.status, currentUser?.role]);

  const topLabel = useMemo(() => {
    if (currentUser?.role !== "admin") {
      return t("project");
    }

    if (!isLoaded.current) {
      return "";
    }

    return project?.company_name ?? t("project");
  }, [isLoaded.current, project?.company_name, currentUser, t]);

  return (
    <>
      <Heading
        title={project?.name ?? searchParams.get("name") ?? ""}
        topLabel={topLabel}
        placeholder={t("project_name")}
        isEditable={isEditable}
        onEdit={(name) => {
          updateProject({ name });
        }}
      />
      <Divider />
      {project && (
        <>
          <div className="md:px-3">
            <LineLinkCodeButton code={project.line_link_code} />
          </div>
          <Divider style={{ background: fontColor2 }} />
          <div className="flex flex-col gap-2">
            <TextArea
              value={description}
              placeholder={t("description")}
              onChange={setDescription}
              disabled={!isEditable}
            />
            {currentUser?.role === "admin" && (
              <Select
                options={statusOptions}
                value={status}
                placeholder={t("status")}
                onChange={(s) => {
                  setStatus(s as string);
                }}
              />
            )}
          </div>
          <div
            style={{
              height: isEdited ? 36 : 0,
              opacity: isEdited ? 1 : 0,
              overflow: "hidden",
              transition:
                "height 0.075s ease-in-out, opacity 0.15s ease-in-out",
              display: "flex",
              alignItems: "flex-end",
              gap: 24,
            }}
          >
            <Button
              variant="tertiary"
              iconLeft={() => <Check />}
              style={{ height: "auto" }}
              label={t("update")}
              onClick={() => {
                if (currentUser?.role === "admin") {
                  updateProject({ description, status });
                } else {
                  updateProject({ description });
                }
              }}
            />
            <Button
              variant="tertiary"
              iconLeft={() => (
                <div style={{ marginRight: -3 }}>
                  <Close color={errorColor1} />
                </div>
              )}
              style={{ height: "auto" }}
              label={t("cancel")}
              onClick={() => {
                setDescription(project.description);
              }}
              textStyle={{ color: errorColor1 }}
            />
          </div>
          <div className="flex justify-between mt-12">
            <div className="self-end">{t("reports")}</div>
            <div className="flex gap-6">
              {(project.reports?.length ?? 0) > 0 && (
                <Button
                  variant="tertiary"
                  style={{ height: "auto" }}
                  label={t(isExcelDownloading ? "downloading" : "export")}
                  iconLeft={() => <Download />}
                  onClick={() => {
                    setShowDownloadExcel(true);
                  }}
                  disabled={isExcelDownloading}
                  iconOnlyMobile
                />
              )}
              {isEditable && (
                <Button
                  variant="tertiary"
                  label={t("create_report")}
                  iconLeft={() => <Plus />}
                  onClick={() => {
                    if (
                      currentUser?.role !== "admin" &&
                      currentUser?.company?.needs_payment_method
                    ) {
                      showModal({
                        title: t("payment_method_required"),
                        subtitle: t("payment_method_required_description")
                      });
                      return;
                    }

                    setShowCreateReport(true);
                  }}
                  style={{ height: "auto" }}
                  iconOnlyMobile
                />
              )}
            </div>
          </div>
          <Divider />
          <ReportsList
            reports={project.reports?.slice(0, 5) ?? []}
            isEmpty={project.reports?.length === 0}
            onViewAll={
              (project.reports?.length ?? 0) < 6
                ? undefined
                : () => {
                  router.push(
                    `/reports?projectId=${projectId}&projectName=${project.name}`,
                  );
                }
            }
            onClickReport={() => {
              setShowLoader(true);
            }}
          />
          <div className="flex justify-between mt-12">
            <div className="self-end">{t("guests")}</div>
            {isEditable && (
              <Button
                variant="tertiary"
                label={t("add_guest")}
                iconLeft={() => <Plus />}
                onClick={() => {
                  setShowAddGuest(true);
                }}
                style={{ height: "auto" }}
                iconOnlyMobile
              />
            )}
          </div>
          <Divider />
          <GuestsList
            guests={projectGuests}
            projectId={projectId}
            isEmpty={projectGuests.length === 0}
            onDelete={(guest) => {
              setGuestToRemove(guest);
            }}
          />
          <div className="flex justify-between mt-12">
            <div className="self-end">{t("action_items")}</div>
            {isEditable && (
              <Button
                variant="tertiary"
                label={t("create_work_item")}
                iconLeft={() => <Plus />}
                onClick={() => {
                  setShowCreateActionItem(true);
                }}
                style={{ height: "auto" }}
                iconOnlyMobile
              />
            )}
          </div>
          <Divider />
          <ActionItemsList
            actionItems={project.action_items?.slice(0, 5) ?? []}
            isEmpty={(project.action_items ?? []).length === 0}
            onEdit={(actionItem) => {
              setEditActionItem(actionItem);
            }}
            onDelete={(actionItem) => {
              setActionItemToDelete(actionItem);
            }}
            onViewAll={() => {
              router.push(`projects/${projectId}/work-items`);
            }}
          />
        </>
      )}
      <CreateReportModal
        templates={reportTemplates ?? []}
        forceProjectId={projectId}
        isOpen={showCreateReport}
        onClose={() => {
          setShowCreateReport(false);
        }}
        onSubmit={(request) => {
          setShowCreateReport(false);
          createReport(request);
        }}
      />
      <DownloadExcelModal
        templates={reportTemplates ?? []}
        disableProject
        isOpen={showDownloadExcel}
        onClose={() => {
          setShowDownloadExcel(false);
        }}
        onSubmit={(templateId, projectId) => {
          setShowDownloadExcel(false);

          const template = reportTemplates?.find((t) => t.id === templateId);
          if (!template) return;

          setIsExcelDownloading(true);

          downloadExcel(templateId, template.name, projectId, project?.name);

          setIsExcelDownloading(false);
        }}
      />
      <AddGuestModal
        knownGuests={nonProjectGuests}
        isOpen={showAddGuest}
        onClose={() => {
          setShowAddGuest(false);
        }}
        onSubmit={(email, firstName, lastName) => {
          setShowAddGuest(false);
          inviteGuest(email, firstName, lastName);
        }}
      />
      <RemoveGuestModal
        isOpen={!!guestToRemove}
        onClose={() => {
          setGuestToRemove(undefined);
        }}
        onRemove={() => {
          if (!guestToRemove) return;

          removeGuest(guestToRemove);
          setGuestToRemove(undefined);
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
      {showLoader && <Loader />}
    </>
  );
};

export default ProjectDashboard;
