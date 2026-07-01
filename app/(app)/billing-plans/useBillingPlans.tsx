"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../../lib/api/ApiContext";
import { BillingPlan, CreateBillingPlanRequest, UpdateBillingPlanRequest } from "@/types/billingPlans";
import { useModal } from "@/lib/modal/ModalContext";
import { useTranslation } from "react-i18next";

export const useBillingPlans = () => {
  const [loading, setLoading] = useState(false);
  const [billingPlans, setBillingPlans] = useState<BillingPlan[]>();
  const { showModal } = useModal();
  const { t } = useTranslation();
  const api = useApi();

  useEffect(() => {
    getBillingPlans();
  }, []);

  const getBillingPlans = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.getBillingPlans();
      setBillingPlans(response);
    } catch (err) {
      showModal({
        title: t("error"),
        subtitle: t("error_description"),
      });
    } finally {
      setLoading(false);
    }
  }, [setBillingPlans]);

  const createBillingPlan = useCallback(
    async (request: CreateBillingPlanRequest) => {
      setLoading(true);

      try {
        await api.createBillingPlan(request);
        await getBillingPlans();
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      } finally {
        setLoading(false);
      }
    },
    [getBillingPlans],
  );

  const updateBillingPlan = useCallback(
    async (billingPlanId: string, request: UpdateBillingPlanRequest) => {
      setLoading(true);

      try {
        await api.updateBillingPlan(billingPlanId, request);
        await getBillingPlans();
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      } finally {
        setLoading(false);
      }
    },
    [getBillingPlans],
  );

  const deleteBillingPlan = useCallback(
    async (billingPlanId: string) => {
      setLoading(true);

      try {
        await api.deleteBillingPlan(billingPlanId);
        await getBillingPlans();
      } catch (err) {
        showModal({
          title: t("error"),
          subtitle: t("error_description"),
        });
      } finally {
        setLoading(false);
      }
    },
    [getBillingPlans],
  );

  return {
    billingPlans,
    createBillingPlan,
    updateBillingPlan,
    deleteBillingPlan,
    loading,
  };
};
