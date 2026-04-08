"use client";

import { useApi } from "@/lib/api/ApiContext";
import { redirect, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReport } from "./useReport";
import { ReportFieldValues, ReportImage, UserRole } from "@/types";
import { Input } from "@/app/ui/Input/Input";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { errorColor1 } from "@/lib/constants";
import DeleteReportModal from "./DeleteReportModal";
import { Loader } from "@/app/ui/Loader";
import { Plus, Download, Trash } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import styles from "./page.module.css";
import { ReportPDF } from "./ReportPDF";
import { pdf } from "@react-pdf/renderer";
import Masonry from "react-masonry-css";
import PhotoDetailModal from "./PhotoDetailModal";
import { useTags } from "../../tags/useTags";

interface ReportDashboardProps {
  reportId: string;
}

const ReportDashboard: FC<ReportDashboardProps> = ({ reportId }) => {
  const { currentUser } = useApi();
  const { tags } = useTags();
  const { t } = useTranslation();
  const {
    report,
    images,
    loading,
    updateReport,
    deleteReport,
    deleteImage,
    updateLoading,
    updateImageDescription,
    updateImageLoading,
    addImageTag,
    removeImageTag,
  } = useReport(reportId);
  const searchParams = useSearchParams();
  const [fieldValues, setFieldValues] = useState<ReportFieldValues>();
  const [selectedPhoto, setSelectedPhoto] = useState<ReportImage>();
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isPhotoModalShown, setIsPhotoModalShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    resetFieldValues();

    if (report) {
      setTimeout(() => {
        loaded.current = true;
      }, 500);
    }
  }, [report]);

  const resetFieldValues = useCallback(() => {
    const newValues: ReportFieldValues = {};

    report?.fields.forEach((f) => {
      newValues[f.id] = f.value;
    });

    setFieldValues(newValues);
  }, [report]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: any) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const isDisabled = useMemo(() => {
    if (
      !fieldValues ||
      !Object.keys(fieldValues ?? []).length ||
      !report?.fields.length
    )
      return true;

    const isChanged = report.fields.some((f) => f.value !== fieldValues[f.id]);
    return !isChanged;
  }, [report, fieldValues]);

  const sortedFields = useMemo(
    () => report?.fields.sort((a, b) => a.order - b.order),
    [report?.fields],
  );

  const shouldRedirect =
    currentUser?.company &&
    report?.company_id &&
    currentUser.role !== UserRole.Admin &&
    currentUser.company.id !== report.company_id;

  if (shouldRedirect) {
    redirect("/");
  }

  return (
    <>
      <Heading
        title={report?.name ?? searchParams.get("name") ?? ""}
        topLabel={t("report")}
        placeholder={t("report_name")}
        onEdit={(name) => {
          updateReport({ name }, true);
        }}
        isEditable
      />
      <Divider />
      <div className="flex w-full flex-row justify-between gap-2 lg:gap-8">
        <Button
          variant="tertiary"
          label={t("download_pdf")}
          iconLeft={() => <Download />}
          onClick={async () => {
            if (!report || !currentUser?.company) return;

            const blob = await pdf(
              <ReportPDF
                report={report}
                companyName={currentUser.company.name}
              />,
            ).toBlob();

            const fileUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = fileUrl;
            a.download = `${report.name.replace(" ", "_")}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(fileUrl);
          }}
          textStyle={{
            fontWeight: "300",
          }}
        />
        <Button
          variant="tertiary"
          label={t("delete")}
          iconLeft={() => <Trash />}
          onClick={() => {
            setIsDeleteModalShown(true);
          }}
          textStyle={{
            fontWeight: "300",
            color: errorColor1,
          }}
        />
      </div>
      {!!sortedFields && (
        <>
          <div className="flex flex-col w-full gap-2 mt-3">
            {sortedFields?.map((field) => (
              <Input
                key={field.id}
                placeholder={field.name}
                value={fieldValues?.[field.id] ?? ""}
                onChange={(value) => {
                  setFieldValues((prev) => {
                    const newValues = { ...prev };
                    newValues[field.id] = value;
                    return newValues;
                  });
                }}
                animationDisabled={!loaded.current}
              />
            ))}
          </div>
          <div
            style={{
              height: isDisabled ? 0 : isMobile ? 136 : 80,
              opacity: isDisabled ? 0 : 1,
              overflow: "hidden",
              transition: "height 0.2s ease-in-out, opacity 0.2s ease-in-out",
            }}
            className="pt-4 w-full grid grid-cols-1 md:grid-cols-2 md:gap-3"
          >
            <Button
              label={t("update_report")}
              onClick={() => {
                updateReport({ field_values: fieldValues });
              }}
              style={{ height: 50 }}
              loading={updateLoading}
            />
            <Button
              variant="secondary"
              label={t("discard_changes")}
              onClick={() => {
                resetFieldValues();
              }}
              style={{ borderColor: errorColor1 }}
              textStyle={{ color: errorColor1 }}
            />
          </div>
          <div className="mt-4 w-full">
            <div className="flex justify-between items-end">
              <div>{t("photos")}</div>
              <Button
                label={t("upload_photo")}
                iconLeft={() => <Plus />}
                variant="tertiary"
                onClick={() => {}}
                style={{ height: "auto" }}
              />
            </div>
            <Divider />
            {!!images && images.length === 0 ? (
              <div className={styles.empty}>
                {t("empty_photos_description")}
              </div>
            ) : (
              <Masonry
                breakpointCols={{
                  default: 4,
                  768: 2,
                }}
                className="flex gap-2"
              >
                {images?.map((i) => (
                  <img
                    key={i.id}
                    className="cursor-pointer hover:opacity-90"
                    src={i.download_url}
                    onClick={() => {
                      setIsPhotoModalShown(true);
                      setSelectedPhoto({ ...i });
                    }}
                  />
                ))}
              </Masonry>
            )}
          </div>
        </>
      )}
      <DeleteReportModal
        isOpen={isDeleteModalShown}
        onClose={() => setIsDeleteModalShown(false)}
        onDelete={() => {
          setIsDeleteModalShown(false);
          deleteReport();
        }}
      />
      <PhotoDetailModal
        image={selectedPhoto}
        tags={tags ?? []}
        reportName={report?.name ?? ""}
        onDeletePhoto={() => {
          if (!selectedPhoto) return;

          deleteImage(selectedPhoto.id);
          setSelectedPhoto(undefined);
        }}
        onUpdateDescription={async (description) => {
          if (!selectedPhoto) return;

          await updateImageDescription(selectedPhoto.id, description);

          setSelectedPhoto({
            ...selectedPhoto,
            description,
          });
        }}
        onAddTag={async (tagId) => {
          if (!selectedPhoto) return;

          const newTag = await addImageTag(selectedPhoto.id, tagId);

          if (newTag) {
            const newTags = selectedPhoto.tags.filter(
              (t) => t.tag_id !== tagId,
            );
            newTags.push(newTag);

            setSelectedPhoto({
              ...selectedPhoto,
              tags: newTags,
            });
          }
        }}
        onDeleteTag={async (linkId) => {
          if (!selectedPhoto) return;

          await removeImageTag(selectedPhoto.id, linkId);

          setSelectedPhoto({
            ...selectedPhoto,
            tags: selectedPhoto.tags.filter((t) => t.link_id !== linkId),
          });
        }}
        loading={updateImageLoading}
        isOpen={isPhotoModalShown}
        onClose={() => {
          setIsPhotoModalShown(false);

          setTimeout(() => {
            setSelectedPhoto(undefined);
          }, 500);
        }}
        isMobile={isMobile}
      />
      {loading && <Loader />}
    </>
  );
};

export default ReportDashboard;
