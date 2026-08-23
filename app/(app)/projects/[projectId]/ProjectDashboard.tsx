"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useApi } from "@/lib/api/ApiContext";
import { CompanyGuest, UserRole, Conversation, ConversationItem, CreateConversationItemRequest, ProjectStatus } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useProject } from "./useProject";
import { Archive, Check, Close, Edit, Plus, Trash } from "@/app/ui/Icons";
import CreateReportModal from "../../reports/CreateReportModal";
import { useReportTemplates } from "../../reports/templates/useReportTemplates";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import ReportsList from "../../reports/ReportsList";
import { cardClass, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import GuestsList from "./GuestsList";
import AddGuestModal from "./AddGuestModal";
import RemoveGuestModal from "./RemoveGuestModal";
import { Loader } from "@/app/ui/Loader";
import CreateConversationItemModal from "./CreateConversationItemModal";
import EditConversationItemModal from "./EditConversationItemModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ConversationsList from "./ConversationsList";
import ConversationModal from "./ConversationModal";
import { useConversationItemTypes } from "@/lib/useConversationItemTypes";
import DeleteConversationModal from "./DeleteConversationModal";
import ConversationCreatedModal from "./ConversationCreatedModal";
import ConversationItemsList from "./ConversationItemsList";
import Divider from "@/app/ui/Divider";
import UnarchiveProjectModal from "./UnarchiveProjectModal";
import ArchiveProjectModal from "./ArchiveProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import CustomFieldListCell from "@/app/ui/CustomFieldListCell/CustomFieldListCell";
// import DownloadExcelModal from "../../reports/DownloadExcelModal";
// import { useExport } from "../../reports/useExport";

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
    projectGuests,
    nonProjectGuests,
    getCompanyGuests,
    companyUsers,
    getCompanyUsers,
    inviteGuest,
    removeGuest,
    createConversation,
    updateConversation,
    deleteConversation,
    createConversationItem,
    updateConversationItem,
    deleteConversationItem,
    deleteProject,
    customFieldDefinitions,
    customFields,
    setCustomFields,
    customRelationships,
    setCustomRelationships,
    customObjectsByDefinition,
    updateCustomField,
    resetCustomField,
    projects,
  } = useProject(projectId);
  const { conversationItemTypes } = useConversationItemTypes(project?.company_id);
  const isLoaded = useRef(false);
  const searchParams = useSearchParams();
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [description, setDescription] = useState("");
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [conversationCreatedCode, setConversationCreatedCode] = useState("");
  const [editConversation, setEditConversation] = useState<Conversation>();
  const [conversationToDelete, setConversationToDelete] = useState<Conversation>();
  const [showCreateConversationItem, setShowCreateConversationItem] = useState<{ id: string, name: string }>();
  const [editConversationItem, setEditConversationItem] = useState<{ item: ConversationItem, typeName: string }>();
  const [conversationItemToDelete, setConversationItemToDelete] = useState<ConversationItem>();
  const [showLoader, setShowLoader] = useState(false);
  const [showArchiveProjectModal, setShowArchiveProjectModal] = useState(false);
  const [showUnarchiveProjectModal, setShowUnarchiveProjectModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [guestToRemove, setGuestToRemove] = useState<CompanyGuest>();
  const isAdmin = currentUser?.role === UserRole.Admin;
  const isAdminOrManager = isAdmin || currentUser?.role === UserRole.Manager;
  const isArchived = project?.status === ProjectStatus.Archived;
  // const { downloadExcel } = useExport();
  // const [showDownloadExcel, setShowDownloadExcel] = useState(false);
  // const [isExcelDownloading, setIsExcelDownloading] = useState(false);

  useEffect(() => {
    if (isLoaded.current || !project) return;

    isLoaded.current = true;
    setDescription(project.description);

    const isAdmin = currentUser?.role === "admin";
    const companyId = isAdmin ? project.company_id : undefined;
    getReportTemplates(companyId);

    getCompanyGuests(project.company_id);
    getCompanyUsers(project.company_id);
  }, [project, currentUser]);

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
      {project && (
        <>
          <div className={cardClass}>
            {isArchived && (
              <>
                <div className="flex items-center justify-between gap-3 md:px-3">
                  <div className="flex items-center gap-1">
                    <Close color={fontColor2} />
                    <div style={{ color: fontColor2 }}>
                      {t("project_archived")}
                    </div>
                  </div>
                  {isAdminOrManager && (
                    <Button
                      variant="tertiary"
                      label={t("unarchive")}
                      onClick={() => {
                        setShowUnarchiveProjectModal(true);
                      }}
                    />
                  )}
                </div>
                <Divider />
              </>
            )}
            {showEditDescription ? (
              <div className="flex flex-col">
                <TextArea
                  value={description}
                  placeholder={t("description")}
                  onChange={setDescription}
                  disabled={!isEditable}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginTop: 12,
                    marginBottom: 6,
                    marginLeft: 6,
                    gap: 24,
                  }}
                >
                  <Button
                    variant="tertiary"
                    iconLeft={() => <Check />}
                    style={{ height: "auto" }}
                    label={t("update")}
                    onClick={() => {
                      updateProject({ description });
                      setShowEditDescription(false);
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
                      setShowEditDescription(false);
                    }}
                    textStyle={{ color: errorColor1 }}
                  />
                </div>
              </div>
            ) : (
              <div
                className="flex flex-1 items-center"
                style={{ minHeight: 60 }}
              >
                <div className="md:px-3 flex flex-1">
                  <div>
                    {!!description && (
                      <div
                        style={{
                          color: fontColor2,
                          fontSize: 12
                        }}>
                        {t("description")}
                      </div>
                    )}
                    <div
                      style={{
                        color: !description ? fontColor2 : fontColor1,
                      }}
                    >
                      {description || t("add_description")}
                    </div>
                  </div>
                </div>
                {isEditable && (
                  <div
                    className="cursor-pointer md:pr-3"
                    onClick={() => {
                      setShowEditDescription(true);
                    }}
                  >
                    <Edit />
                  </div>
                )}
              </div>
            )}
            {customFieldDefinitions.map((item) => (
              <div key={item.id}>
                <Divider />
                <CustomFieldListCell
                  fields={customFields}
                  relationships={customRelationships}
                  definition={item}
                  projects={projects}
                  users={[...companyUsers, ...projectGuests]}
                  customObjectsByDefinition={customObjectsByDefinition}
                  onFieldChange={(value) => {
                    setCustomFields((prev) => ({
                      ...prev,
                      [item.id]: value
                    }));
                  }}
                  onRelationshipChange={(value) => {
                    setCustomRelationships((prev) => ({
                      ...prev,
                      [item.id]: value
                    }));
                  }}
                  onCancel={() => {
                    resetCustomField(item.id);
                  }}
                  onSubmit={() => {
                    updateCustomField(item.id);
                  }}
                  isEditable={isEditable}
                />
              </div>
            ))}
          </div>

          {/* Conversations */}
          <div className="flex justify-between mt-12">
            <div className="self-end">{t("conversations")}</div>
            {isEditable && (
              <Button
                variant="tertiary"
                label={t("create_conversation")}
                iconLeft={() => <Plus />}
                onClick={() => {
                  setShowConversationModal(true);
                }}
                style={{ height: "auto" }}
                iconOnlyMobile
              />
            )}
          </div>
          <div className={cardClass}>
            <ConversationsList
              conversations={project.conversations}
              isEmpty={(project.conversations ?? []).length === 0}
              isDisabled={!isEditable}
              onClickConversation={(conversation) => {
                setEditConversation(conversation);
                setShowConversationModal(true);
              }}
            />
          </div>

          {project.conversation_items.map((c) => (
            <div className="mt-12" key={c.conversation_item_type_id}>
              <div className="flex justify-between">
                <div className="self-end">{c.conversation_item_type_name}</div>
                {isEditable && (
                  <Button
                    variant="tertiary"
                    label={t("create")}
                    iconLeft={() => <Plus />}
                    onClick={() => {
                      setShowCreateConversationItem({
                        id: c.conversation_item_type_id,
                        name: c.conversation_item_type_name
                      });
                    }}
                    style={{ height: "auto" }}
                    iconOnlyMobile
                  />
                )}
              </div>
              <div className={cardClass}>
                <ConversationItemsList
                  conversationItems={c.items.slice(0, 5)}
                  isEmpty={(c.items ?? []).length === 0}
                  isDisabled={!isEditable}
                  onClickConversationItem={(ci) => {
                    setEditConversationItem({
                      item: ci,
                      typeName: c.conversation_item_type_name
                    });
                  }}
                  onViewAll={(c.items.length ?? 0) > 5 ? () => {
                    router.push(`${projectId}/conversation-items?conversationItemTypeId=${c.conversation_item_type_id}`);
                  } : undefined}
                />
              </div>
            </div>
          ))}

          {/* Reports */}
          <div className="flex justify-between mt-12">
            <div className="self-end">{t("reports")}</div>
            <div className="flex gap-6">
              {/* {(project.reports?.length ?? 0) > 0 && (
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
              )} */}
              {(isEditable && reportTemplates?.length !== 0) && (
                <Button
                  variant="tertiary"
                  label={t("create_report")}
                  iconLeft={() => <Plus />}
                  onClick={() => {
                    setShowCreateReport(true);
                  }}
                  style={{ height: "auto" }}
                  iconOnlyMobile
                />
              )}
            </div>
          </div>
          <div className={cardClass}>
            <ReportsList
              reports={project.reports?.slice(0, 5) ?? []}
              isEmpty={project.reports?.length === 0}
              isDisabled={!isEditable}
              onViewAll={
                (project.reports?.length ?? 0) < 6
                  ? undefined
                  : () => {
                    router.push(
                      `/reports?projectId=${projectId}&projectName=${project.name}`,
                    );
                  }
              }
              needsTemplates={reportTemplates?.length === 0 && isAdminOrManager}
              onClickReport={() => {
                setShowLoader(true);
              }}
            />
          </div>

          {/* Guests */}
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
          <div className={cardClass}>
            <GuestsList
              guests={projectGuests}
              isEmpty={projectGuests.length === 0}
              isDisabled={!isEditable}
              onDelete={(guest) => {
                setGuestToRemove(guest);
              }}
            />
          </div>
        </>
      )}
      {!!project && (
        <div className="mt-10 flex flex-1 justify-end">
          <div className="flex gap-8">
            {isAdmin && (
              <Button
                variant="tertiary"
                label={t("delete_project")}
                iconLeft={() => <Trash />}
                onClick={() => {
                  setShowDeleteProjectModal(true);
                }}
                textStyle={{ color: errorColor1 }}
              />
            )}
            {!isArchived && isAdminOrManager && (
              <Button
                variant="tertiary"
                label={t("archive_project")}
                iconLeft={() => <Archive />}
                onClick={() => {
                  setShowArchiveProjectModal(true);
                }}
                textStyle={{ color: errorColor1 }}
              />
            )}
          </div>
        </div>
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
      {/* <DownloadExcelModal
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
      /> */}
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
      <CreateConversationItemModal
        isOpen={!!showCreateConversationItem}
        assignees={[...companyUsers, ...projectGuests]}
        title={showCreateConversationItem?.name ?? t("create")}
        onClose={() => {
          setShowCreateConversationItem(undefined);
        }}
        onCreate={(name, description, assigneeId) => {
          if (showCreateConversationItem) {
            const request: CreateConversationItemRequest = {
              project_id: projectId,
              conversation_item_type_id: showCreateConversationItem.id,
              name,
              description,
            };

            if (assigneeId) {
              request.assignee_id = assigneeId;
            }

            createConversationItem(request);
          }

          setShowCreateConversationItem(undefined);
        }}
      />
      <ConversationModal
        conversation={editConversation}
        conversationItemTypes={conversationItemTypes}
        isOpen={showConversationModal}
        onClose={() => {
          setShowConversationModal(false);

          setTimeout(() => {
            setEditConversation(undefined);
          }, 500);
        }}
        onSubmit={async (name, itemTypes) => {
          setShowConversationModal(false);

          if (!project) return;

          const item_type_ids = itemTypes.map((i) => i.id);

          if (editConversation) {
            updateConversation(
              editConversation.id,
              { name, item_type_ids }
            );

            setTimeout(() => {
              setEditConversation(undefined);
            }, 500);
          } else {
            const conversation = await createConversation({
              project_id: projectId,
              company_id: project.company_id,
              name,
              item_type_ids,
            });

            if (conversation) {
              setConversationCreatedCode(conversation.line_link_code);
            }
          }
        }}
        onDelete={() => {
          setShowConversationModal(false);

          setTimeout(() => {
            setConversationToDelete(editConversation);
            setEditConversation(undefined);
          }, 500);
        }}
      />
      <ConversationCreatedModal
        code={conversationCreatedCode}
        isOpen={!!conversationCreatedCode}
        onClose={() => {
          setTimeout(() => {
            setConversationCreatedCode("");
          }, 500);
        }}
      />
      <DeleteConversationModal
        isOpen={!!conversationToDelete}
        onClose={() => {
          setConversationToDelete(undefined);
        }}
        onDelete={() => {
          if (conversationToDelete) {
            deleteConversation(conversationToDelete.id);
          }

          setConversationToDelete(undefined);
        }}
      />
      <EditConversationItemModal
        isOpen={!!editConversationItem}
        title={editConversationItem?.typeName ?? t('edit')}
        conversationItem={editConversationItem?.item}
        assignees={[...companyUsers, ...projectGuests]}
        onClose={() => {
          setEditConversationItem(undefined);
        }}
        onSubmit={(request) => {
          if (editConversationItem) {
            updateConversationItem(
              editConversationItem.item.id,
              request
            );
          }
        }}
        onDelete={(conversationItem) => {
          setEditConversationItem(undefined);

          setTimeout(() => {
            setConversationItemToDelete(conversationItem);
          }, 500);
        }}
      />
      <ConfirmDeleteModal
        isOpen={!!conversationItemToDelete}
        onClose={() => {
          setConversationItemToDelete(undefined);
        }}
        onDelete={() => {
          if (conversationItemToDelete) {
            deleteConversationItem(conversationItemToDelete.id);
          }

          setConversationItemToDelete(undefined);
        }}
      />
      <ArchiveProjectModal
        isOpen={showArchiveProjectModal}
        onClose={() => {
          setShowArchiveProjectModal(false);
        }}
        onArchive={() => {
          updateProject({ status: ProjectStatus.Archived });
          setShowArchiveProjectModal(false);
        }}
      />
      <UnarchiveProjectModal
        isOpen={showUnarchiveProjectModal}
        onClose={() => {
          setShowUnarchiveProjectModal(false);
        }}
        onUnarchive={() => {
          updateProject({ status: ProjectStatus.Active });
          setShowUnarchiveProjectModal(false);
        }}
      />
      <DeleteProjectModal
        isOpen={showDeleteProjectModal}
        onClose={() => {
          setShowDeleteProjectModal(false);
        }}
        onDelete={() => {
          setShowDeleteProjectModal(false);
          deleteProject();
        }}
      />
      {showLoader && <Loader />}
    </>
  );
};

export default ProjectDashboard;
