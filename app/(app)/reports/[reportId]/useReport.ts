"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [report, setReport] = useState<Report>();
  const [images, setImages] = useState<ReportImage[]>();
  const imagesRef = useRef<ReportImage[] | undefined>(undefined);
  const [selectedPhoto, setSelectedPhoto] = useState<ReportImage>();
  const { t } = useTranslation();
  const router = useRouter();
  const api = useApi();
  const { showModal } = useModal();
  const pollingRef = useRef<Record<string, NodeJS.Timeout>>({});
  const selectedPhotoRef = useRef<ReportImage | undefined>(undefined);

  useEffect(() => {
    getReport(reportId);
    getImages(reportId);
  }, [reportId]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    selectedPhotoRef.current = selectedPhoto;
  }, [selectedPhoto]);

  const pollImageStatus = useCallback(
    (imageId: string) => {
      let attempts = 0;
      const maxAttempts = 30;

      const poll = async () => {
        attempts++;

        try {
          const data = await api.getImageStatus(reportId, imageId);
          if (!data) return;

          setImages((prev) => {
            if (!prev) return prev;

            const idx = prev.findIndex((i) => i.id === imageId);
            if (idx === -1) return prev;

            const updated = [...prev];
            const existing = updated[idx];

            updated[idx] = {
              ...existing,
              status: data.status,
              description: data.description,
              tags: data.tags ?? [],
            };

            if (selectedPhotoRef.current?.id === imageId) {
              setSelectedPhoto(updated[idx]);
            }

            return updated;
          });

          if (data.status === "completed" || data.status === "failed") {
            clearInterval(pollingRef.current[imageId]);
            delete pollingRef.current[imageId];
          }

          if (attempts >= maxAttempts) {
            clearInterval(pollingRef.current[imageId]);
            delete pollingRef.current[imageId];
          }
        } catch (err) {
          // console.error("Polling error:", err);
        }
      };

      const interval = setInterval(poll, 1000);
      pollingRef.current[imageId] = interval;

      poll();
    },
    [api, reportId],
  );

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
      setImagesLoading(true);

      try {
        const response = await api.getReportImages(reportId);
        setImages(response ?? []);

        (response ?? []).forEach((img: ReportImage) => {
          if (img.status === "pending" || img.status === "processing") {
            pollImageStatus(img.id);
          }
        });
      } catch (err) {
        console.log(err);
      }

      setImagesLoading(false);
    },
    [api, reportId, setImages],
  );

  const updateReport = useCallback(
    async (request: ReportRequest, silent: boolean = false) => {
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
    async (description: string) => {
      if (!selectedPhoto) return;

      try {
        const response = await api.updateImage(reportId, selectedPhoto.id, {
          description,
        });

        if (response) {
          const imageIndex =
            images?.findIndex((i) => i.id === selectedPhoto.id) ?? -1;

          if (imageIndex > -1) {
            const newImages = [...(images ?? [])];
            newImages[imageIndex] = {
              ...newImages[imageIndex],
              description,
            };
            setImages(newImages);
          }

          setSelectedPhoto({
            ...selectedPhoto,
            description,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [images, reportId, selectedPhoto],
  );

  const addImageTag = useCallback(
    async (tagId: string) => {
      if (!selectedPhoto) return;

      try {
        const request = { tag_id: tagId };
        const response = await api.addTag(reportId, selectedPhoto.id, request);

        if (response) {
          const imageIndex =
            images?.findIndex((i) => i.id === selectedPhoto.id) ?? -1;

          if (imageIndex > -1) {
            const newImages = [...(images ?? [])];
            newImages[imageIndex].tags.push(response);
            setImages(newImages);
          }

          const newTags = selectedPhoto.tags.filter((t) => t.tag_id !== tagId);
          newTags.push(response);

          setSelectedPhoto({
            ...selectedPhoto,
            tags: newTags,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [images, reportId, selectedPhoto],
  );

  const removeImageTag = useCallback(
    async (linkId: string) => {
      if (!selectedPhoto) return;

      try {
        await api.removeTag(reportId, selectedPhoto.id, linkId);

        const imageIndex =
          images?.findIndex((i) => i.id === selectedPhoto.id) ?? -1;

        if (imageIndex > -1) {
          const newImages = [...(images ?? [])];
          const { tags } = newImages[imageIndex];
          newImages[imageIndex].tags = tags.filter((t) => t.link_id !== linkId);
          setImages(newImages);

          setSelectedPhoto({
            ...selectedPhoto,
            tags: selectedPhoto.tags.filter((t) => t.link_id !== linkId),
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [images, reportId, selectedPhoto],
  );

  const deleteImage = useCallback(async () => {
    if (!selectedPhoto) return;

    setLoading(true);

    try {
      await api.deleteImage(reportId, selectedPhoto.id);
      setImages(images?.filter((i) => i.id !== selectedPhoto.id));
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("delete_photo_error"),
      });
    }

    setSelectedPhoto(undefined);
    setLoading(false);
  }, [reportId, images, selectedPhoto]);

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

        pollImageStatus(newImage.id);
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
    loading: loading || imagesLoading,
    report,
    images,
    updateReport,
    deleteReport,
    deleteImage,
    updateImageDescription,
    addImageTag,
    removeImageTag,
    uploadImage,
    selectedPhoto,
    setSelectedPhoto,
  };
};
