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
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    getReport(reportId);
    getImages(reportId);
  }, [reportId]);

  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_API_WS_URL}/reports/images/ws`,
    );

    ws.onopen = () => {
      console.log("✅ WebSocket connected!");
      ws.send("Hello from client");
    };

    ws.onmessage = (event) => {
      console.log("📨 Received from server:", event.data);
    };

    ws.onclose = (event) => {
      console.log("❌ Connection closed:", event.code, event.reason);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    if (!wsRef.current) return;

    wsRef.current.onmessage = (event) => {
      if (!imagesRef.current) return;

      try {
        const data = JSON.parse(event.data);

        console.log("DATA", data);

        if (data.type === "image_tags_ready" && data.tags && data.image_id) {
          const imageIndex =
            imagesRef.current.findIndex((i) => i.id === data.image_id) ?? -1;

          if (imageIndex > -1) {
            const newImage = { ...imagesRef.current[imageIndex] };
            const newDescription = data.description
              ? `${newImage.description ? `${newImage.description}\n\n` : ""}${data.description ?? ""}`
              : newImage.description;

            data.tags.forEach((tag: ReportImageTagLink) => {
              const hasTag = newImage.tags.some((t) => t.tag_id === tag.tag_id);
              if (!hasTag) newImage.tags.push(tag);
            });

            if (selectedPhoto && selectedPhoto.id === data.image_id) {
              setSelectedPhoto({
                ...selectedPhoto,
                tags: newImage.tags,
                description: newDescription,
                status: "completed",
              });
            }

            newImage.status = "completed";
            newImage.description = newDescription;

            imagesRef.current[imageIndex] = newImage;
            setImages(imagesRef.current);
          }
        }
      } catch (err) {
        console.warn("Invalid WS message", err);
      }
    };
  }, [selectedPhoto]);

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
