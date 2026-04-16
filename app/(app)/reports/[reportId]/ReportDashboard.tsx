"use client";

import { useApi } from "@/lib/api/ApiContext";
import { redirect, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReport } from "./useReport";
import { ReportFieldValues, ReportImageTag, UserRole } from "@/types";
import { Input } from "@/app/ui/Input/Input";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { bgColor2, bgColor3, buttonColor, errorColor1 } from "@/lib/constants";
import DeleteReportModal from "./DeleteReportModal";
import { Loader } from "@/app/ui/Loader";
import { Plus, Download, Trash, Tag, Close, Check } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import styles from "./page.module.css";
import { ReportPDF } from "./ReportPDF";
import { pdf } from "@react-pdf/renderer";
import Masonry from "react-masonry-css";
import PhotoDetailModal from "./PhotoDetailModal";
import { useTags } from "../../tags/useTags";
import FilterByTagModal from "./FilterByTagModal";
import Image from "next/image";

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
    updateImageDescription,
    addImageTag,
    removeImageTag,
    uploadImage,
    selectedPhoto,
    setSelectedPhoto,
  } = useReport(reportId);
  const searchParams = useSearchParams();
  const [fieldValues, setFieldValues] = useState<ReportFieldValues>();
  const [selectedTag, setSelectedTag] = useState<ReportImageTag>();
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isPhotoModalShown, setIsPhotoModalShown] = useState(false);
  const [isFilterByTagModalShown, setIsFilterByTagModalShown] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<any>(null);

  useEffect(() => {
    resetFieldValues();
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

  const filteredImages = useMemo(() => {
    if (!selectedTag) return images ?? [];

    return (images ?? []).filter((i) =>
      i.tags.some((tag) => tag.tag_id === selectedTag.id),
    );
  }, [images, selectedTag]);

  const sortedFields = useMemo(() => {
    return [...(report?.fields ?? [])].sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;

      return a.id.localeCompare(b.id);
    });
  }, [report?.fields]);

  console.log("FIELDS", sortedFields);

  const shouldRedirect =
    currentUser?.company &&
    report?.company_id &&
    currentUser.role !== UserRole.Admin &&
    currentUser.company.id !== report.company_id;

  const ImageList = useMemo(
    () => (
      <Masonry
        breakpointCols={{
          default: 4,
          768: 2,
        }}
        className="flex gap-2"
      >
        {filteredImages.map((i) => (
          <div
            key={i.id}
            className={`mb-2 cursor-pointer hover:opacity-90${!loadedImages[i.id] ? " animate-pulse" : ""}`}
            onClick={() => {
              setIsPhotoModalShown(true);
              setSelectedPhoto({ ...i });
            }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: `${i.width} / ${i.height}`,
              backgroundColor: bgColor2,
            }}
          >
            <Image
              alt={i.id}
              sizes="(max-width: 768px) 50vw, 25vw"
              src={i.download_url}
              fill
              className={`object-cover transition-opacity duration-200 ${
                !loadedImages[i.id] ? "opacity-0" : "opacity-100"
              }`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              onLoad={(e) => {
                setLoadedImages((p) => ({ ...p, [i.id]: true }));
              }}
            />
          </div>
        ))}
      </Masonry>
    ),
    [filteredImages, loadedImages],
  );

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
      {report != null && (
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
              a.download = `${report.name.replace(/ /g, "_")}.pdf`;
              document.body.appendChild(a);
              a.click();
              a.remove();

              URL.revokeObjectURL(fileUrl);
            }}
            style={{ height: "auto" }}
            textStyle={{
              fontWeight: "300",
            }}
          />
          <Button
            variant="tertiary"
            label={t("delete_report")}
            iconLeft={() => <Trash />}
            onClick={() => {
              setIsDeleteModalShown(true);
            }}
            style={{ height: "auto" }}
            textStyle={{
              fontWeight: "300",
              color: errorColor1,
            }}
          />
        </div>
      )}
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
                loading={loading}
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
              iconLeft={() => <Check color="white" />}
              style={{ height: 50 }}
            />
            <Button
              variant="secondary"
              label={t("discard_changes")}
              onClick={() => {
                resetFieldValues();
              }}
              iconLeft={() => <Close color={errorColor1} />}
              style={{ borderColor: errorColor1 }}
              textStyle={{ color: errorColor1 }}
            />
          </div>
        </>
      )}
      {images != null && (
        <div className="mt-4 w-full">
          <div className="flex justify-between items-end">
            <div>{t("photos")}</div>
            <Button
              label={t("upload_photo")}
              iconLeft={() => <Plus />}
              variant="tertiary"
              onClick={() => {
                fileInputRef.current?.click();
              }}
              style={{ height: "auto" }}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e: any) => {
                const file = e.target.files?.[0];
                if (!file) return;

                uploadImage(file);
              }}
              style={{ display: "none" }}
            />
          </div>
          <Divider />
          {!!images && images.length === 0 ? (
            <div className={styles.empty}>{t("empty_photos_description")}</div>
          ) : (
            <>
              <div className="mb-3 flex w-full flex-row justify-between gap-2 lg:gap-8">
                <Button
                  variant="tertiary"
                  label={t("download_all")}
                  iconLeft={() => <Download />}
                  onClick={async () => {}}
                  style={{ height: "auto" }}
                  textStyle={{
                    fontWeight: "300",
                  }}
                />
                <Button
                  variant="tertiary"
                  label={selectedTag?.name ?? t("filter_by_tag")}
                  iconLeft={() => <Tag color={buttonColor} size={30} />}
                  onClick={() => {
                    setIsFilterByTagModalShown(true);
                  }}
                  style={{ height: "auto" }}
                  textStyle={{
                    fontWeight: "300",
                  }}
                />
              </div>
              {filteredImages.length === 0 && (
                <div className={styles.empty}>
                  {t("empty_tag_photos_description")}
                </div>
              )}
              {ImageList}
            </>
          )}
        </div>
      )}
      <DeleteReportModal
        isOpen={isDeleteModalShown}
        onClose={() => setIsDeleteModalShown(false)}
        onDelete={() => {
          setIsDeleteModalShown(false);
          deleteReport();
        }}
      />
      <FilterByTagModal
        tags={tags ?? []}
        isOpen={isFilterByTagModalShown}
        onClose={() => setIsFilterByTagModalShown(false)}
        onSelectTag={(tag?: ReportImageTag) => {
          setSelectedTag(tag);
        }}
      />
      <PhotoDetailModal
        image={selectedPhoto}
        tags={tags ?? []}
        reportName={report?.name ?? ""}
        onDeletePhoto={() => {
          deleteImage();
        }}
        onUpdateDescription={async (description) => {
          updateImageDescription(description);
        }}
        onAddTag={async (tagId) => {
          addImageTag(tagId);
        }}
        onDeleteTag={async (linkId) => {
          removeImageTag(linkId);
        }}
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
