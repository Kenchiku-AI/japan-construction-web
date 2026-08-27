"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useModal } from "@/lib/modal/ModalContext";
import { useTranslation } from "react-i18next";
import { FormJob, FormJobStatus } from "@/types";
import JSZip from "jszip";

export const useForms = (companyId?: string) => {
  const [loading, setLoading] = useState(false);
  const [formJobs, setFormJobs] = useState<FormJob[]>();
  const { currentUser, ...api } = useApi();
  const { showModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    getFormJobs();
  }, [companyId]);

  const getFormJobs = useCallback(async () => {
    if (!companyId) return;

    setLoading(true);

    try {
      const response = await api.getFormJobs(companyId);
      setFormJobs(response);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  const createFormJob = useCallback(
    async (file: File, name: string, description: string) => {
      if (!companyId) return;

      setLoading(true);

      try {
        const request = {
          company_id: companyId,
          name,
          description,
          filename: file.name,
          content_type: file.type
        }
        const createResponse = await api.createFormJob(request);

        const uploadResponse = await fetch(createResponse.upload_url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (!uploadResponse.ok) throw new Error();

        pollFormJob(createResponse.id);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      }

      setLoading(false);
    },
    [companyId],
  );

  const deleteFormJob = async (formJobId: string) => {
    setLoading(true);

    try {
      await api.deleteFormJob(formJobId);

      setFormJobs((prev) => {
        return prev?.filter((f) => f.id !== formJobId);
      })
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  const pollFormJob = async (formJobId: string) => {
    let failCount = 0;

    for (let attempt = 0; attempt < 200; attempt++) {
      try {
        const response = await api.getFormJob(formJobId);

        if (!response) {
          throw new Error("Failed to get form job status.");
        }

        setFormJobs((prev) => {
          const index = (prev ?? []).findIndex((f) => f.id === formJobId);

          if (index === -1) {
            return [
              response,
              ...(prev ?? []),
            ]
          }

          const newJobs = [...(prev ?? [])];
          newJobs[index] = response;
          return newJobs;
        });

        if (
          response.status === FormJobStatus.Completed ||
          response.status === FormJobStatus.NeedsReview ||
          response.status === FormJobStatus.Failed
        ) {
          return;
        }
      } catch (e) {
        failCount += 1;
        if (failCount > 2) return;
      }

      await new Promise(
        (resolve) => setTimeout(resolve, 3000),
      );
    }
  };

  const downloadFiles = async (formJob: FormJob, fileId?: string) => {
    setLoading(true);

    try {
      const response = await api.downloadFormJobFiles(formJob.id);

      if (response) {
        const { files } = response;

        if (!fileId) {
          const zip = new JSZip();

          await Promise.all(
            response.files.map(async (file) => {
              const response = await fetch(file.download_url);

              if (!response.ok) {
                throw new Error(
                  `Failed to download ${file.filename}: ${response.status}`
                );
              }

              const blob = await response.blob();

              zip.file(file.filename, blob);
            })
          );

          const zipBlob = await zip.generateAsync({
            type: "blob",
          });

          const url = URL.createObjectURL(zipBlob);

          const link = document.createElement("a");
          link.href = url;
          link.download = `${formJob.name.replace(/ /g, "_").replace(/[()]/g, "")}.zip`;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          URL.revokeObjectURL(url);
        } else {
          const file = files.find((f) => f.id === fileId);
          if (!file) {
            throw new Error();
          }

          const link = document.createElement("a");

          link.href = file.download_url;
          link.download = file.filename;
          link.target = "_blank";
          link.rel = "noopener noreferrer";

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (e) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    }

    setLoading(false);
  };

  return {
    loading,
    formJobs,
    createFormJob,
    deleteFormJob,
    downloadFiles
  };
};
