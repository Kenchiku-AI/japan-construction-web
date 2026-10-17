"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { CatalogItem, CreateCatalogItemRequest, UpdateCatalogItemRequest } from "@/types/catalog";
import { useModal } from "@/lib/modal/ModalContext";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";

export const useCatalogItems = (companyId?: string) => {
  const [loading, setLoading] = useState(true);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>();
  const { currentUser, ...api } = useApi();
  const { showModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("Company ID", companyId);

    if (companyId) {
      getCatalogItems(companyId);
    }
  }, [companyId]);

  const getCatalogItems = async (companyId: string) => {
    console.log("Company ID", companyId);

    setLoading(true);

    try {
      const response = await api.getCatalogItems(companyId);
      setCatalogItems(response);
    } finally {
      setLoading(false);
    }
  };

  const createCatalogItem = useCallback(
    async (request: CreateCatalogItemRequest) => {
      if (!companyId) return;

      setLoading(true);

      try {
        await api.createCatalogItem(request);
        await getCatalogItems(companyId);
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

  const updateCatalogItem = useCallback(
    async (catalogItemId: string, request: UpdateCatalogItemRequest) => {
      if (!companyId) return;

      setLoading(true);

      try {
        await api.updateCatalogItem(catalogItemId, request);
        await getCatalogItems(companyId);
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

  const deleteCatalogItem = useCallback(
    async (itemId: string) => {
      if (!companyId) return;

      setLoading(true);

      try {
        await api.deleteCatalogItem(itemId);
        await getCatalogItems(companyId);
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

  const search = useMemo(() =>
    debounce(async (query: string) => {
      if (!companyId) return;

      if (query.length < 1) {
        setCatalogItems([]);
        return;
      }

      try {
        const response = await api.getCatalogItems(companyId, query);
        setCatalogItems(response ?? []);
      } finally {
      }
    }, 400)
    ,
    [companyId],
  );

  return {
    loading,
    catalogItems,
    setCatalogItems,
    getCatalogItems,
    createCatalogItem,
    updateCatalogItem,
    deleteCatalogItem,
    search
  };
};
