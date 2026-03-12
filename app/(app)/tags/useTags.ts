"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { ReportImageTag, ReportImageTagRequest } from "@/types/reports";
import { useRouter } from "next/navigation";
import { useModal } from "@/lib/modal/ModalContext";
import { useTranslation } from "react-i18next";
import { updateTag } from "next/cache";

export const useTags = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<ReportImageTag[]>();
  const { currentUser, ...api } = useApi();
  const router = useRouter();
  const { showModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    if (!currentUser) return;

    getTags();
  }, [currentUser]);

  const getTags = useCallback(async () => {
    const companyId = currentUser?.company?.id;
    if (!companyId) return;

    setLoading(true);

    try {
      const response = await api.getTags(companyId);
      setTags(response);
    } finally {
      setLoading(false);
    }
  }, [currentUser, setTags]);

  const createTag = useCallback(
    async (request: ReportImageTagRequest) => {
      const companyId = currentUser?.company?.id;
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
    [currentUser],
  );

  const updateTag = useCallback(
    async (tagId: string, request: ReportImageTagRequest) => {
      const companyId = currentUser?.company?.id;
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
    [currentUser],
  );

  return {
    loading,
    tags,
    createTag,
    updateTag,
  };
};
