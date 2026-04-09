"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import {
  Report,
  ReportImage,
  ReportImageTagLink,
  ReportRequest,
} from "@/types/reports";
import { useTranslation } from "react-i18next";
import imageCompression from "browser-image-compression";
import { useModal } from "@/lib/modal/ModalContext";

export const useReport = (reportId: string) => {
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateImageLoading, setUpdateImageLoading] = useState(false);
  const [report, setReport] = useState<Report>();
  const [images, setImages] = useState<ReportImage[]>();
  const { t } = useTranslation();
  const router = useRouter();
  const api = useApi();
  const { showModal } = useModal();

  useEffect(() => {
    getReport(reportId);
    getImages(reportId);
  }, [reportId]);

  const getReport = useCallback(
    async (reportId: string) => {
      setLoading(true);

      try {
        const response = await api.getReport(reportId);
        setReport(response);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("get_report_error_description"),
        });

        router.replace("/");
      }

      setLoading(false);
    },
    [api, reportId, setReport],
  );

  const getImages = useCallback(
    async (reportId: string) => {
      setLoading(true);

      try {
        const response = await api.getReportImages(reportId);
        setImages(response);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    },
    [api, reportId, setImages],
  );

  const updateReport = useCallback(
    async (request: ReportRequest, silent: boolean = false) => {
      if (!silent) {
        setUpdateLoading(true);
      }

      try {
        const response = await api.updateReport(reportId, request);
        setReport(response);
      } catch (err) {
        if (!silent) {
          showModal({
            title: t("error"),
            subtitle: t("update_report_error_description"),
          });
        }
      }

      setUpdateLoading(false);
    },
    [setReport, reportId],
  );

  const deleteReport = useCallback(async () => {
    setLoading(true);

    try {
      await api.deleteReport(reportId);
      router.replace("/reports");
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("delete_report_error"),
      });
    }

    setLoading(false);
  }, [reportId]);

  const updateImageDescription = useCallback(
    async (imageId: string, description: string) => {
      setUpdateImageLoading(true);

      try {
        const response = await api.updateImage(reportId, imageId, {
          description,
        });

        if (response) {
          const imageIndex = images?.findIndex((i) => i.id === imageId) ?? -1;

          if (imageIndex > -1) {
            const newImages = [...(images ?? [])];
            newImages[imageIndex] = {
              ...newImages[imageIndex],
              description,
            };
            setImages(newImages);
          }
        }
      } catch (err) {
        console.log(err);
      }

      setUpdateImageLoading(false);
    },
    [images, reportId],
  );

  const addImageTag = useCallback(
    async (imageId: string, tagId: string) => {
      let tag: ReportImageTagLink | undefined;

      try {
        const request = { tag_id: tagId };
        const response = await api.addTag(reportId, imageId, request);

        if (response) {
          tag = response;
          const imageIndex = images?.findIndex((i) => i.id === imageId) ?? -1;

          if (imageIndex > -1) {
            const newImages = [...(images ?? [])];
            newImages[imageIndex].tags.push(response);
            setImages(newImages);
          }
        }
      } catch (err) {
        console.log(err);
      }

      return tag;
    },
    [images, reportId],
  );

  const removeImageTag = useCallback(
    async (imageId: string, linkId: string) => {
      try {
        await api.removeTag(reportId, imageId, linkId);

        const imageIndex = images?.findIndex((i) => i.id === imageId) ?? -1;

        if (imageIndex > -1) {
          const newImages = [...(images ?? [])];
          const { tags } = newImages[imageIndex];
          newImages[imageIndex].tags = tags.filter((t) => t.link_id !== linkId);
          setImages(newImages);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [images, reportId],
  );

  const deleteImage = useCallback(
    async (imageId: string) => {
      setLoading(true);

      try {
        await api.deleteImage(reportId, imageId);
        setImages(images?.filter((i) => i.id !== imageId));
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("delete_photo_error"),
        });
      }

      setLoading(false);
    },
    [reportId, images],
  );

  const uploadImage = useCallback(
    async (file: File) => {
      setLoading(true);

      try {
        const resized = await imageCompression(file, {
          maxWidthOrHeight: 1024,
          initialQuality: 0.8,
          fileType: "image/jpeg",
          useWebWorker: true,
        });

        const bitmap = await createImageBitmap(resized);

        const request = {
          width: bitmap.width,
          height: bitmap.height,
        };

        const createResponse = await api.createImage(reportId, request);
        if (!createResponse) throw new Error();

        const uploadResponse = await fetch(createResponse.upload_url, {
          method: "PUT",
          headers: {
            "Content-Type": "image/jpeg",
          },
          body: resized,
        });

        if (!uploadResponse.ok) throw new Error();

        const newImage = {
          ...createResponse,
          download_url: URL.createObjectURL(file),
        };
        setImages([...(images ?? []), newImage]);
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("upload_image_error"),
        });
      }

      setLoading(false);
    },
    [reportId, images],
  );

  return {
    loading,
    updateLoading,
    report,
    images,
    updateReport,
    deleteReport,
    deleteImage,
    updateImageDescription,
    updateImageLoading,
    addImageTag,
    removeImageTag,
    uploadImage,
  };
};
