"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { ImageTag, ImageTagRequest } from "@/types/reports";
import { useModal } from "@/lib/modal/ModalContext";
import { useTranslation } from "react-i18next";

export const useTags = (companyId?: string) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<ImageTag[]>();
  const { currentUser, ...api } = useApi();
  const { showModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    getTags();
  }, []);

  const getTags = useCallback(async () => {
    if (!companyId) return;

    setLoading(true);

    try {
      const response = await api.getTags(companyId);
      setTags(response);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  const createTag = useCallback(
    async (request: ImageTagRequest) => {
      if (!companyId) return;

      setLoading(true);

      try {
        await api.createTag(companyId, request);
        await getTags();
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("create_tag_error_description"),
        });
      }

      setLoading(false);
    },
    [companyId],
  );

  const updateTag = useCallback(
    async (tagId: string, request: ImageTagRequest) => {
      if (!companyId) return;

      setLoading(true);

      try {
        await api.updateTag(companyId, tagId, request);
        await getTags();
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("update_tag_error_description"),
        });
      }

      setLoading(false);
    },
    [companyId],
  );

  const deleteTag = useCallback(
    async (tagId: string) => {
      if (!companyId) return;

      setLoading(true);

      try {
        await api.deleteTag(companyId, tagId);
        await getTags();
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("delete_tag_error"),
        });
      }

      setLoading(false);
    },
    [companyId],
  );

  return {
    loading,
    tags,
    getTags,
    createTag,
    updateTag,
    deleteTag,
  };
};
