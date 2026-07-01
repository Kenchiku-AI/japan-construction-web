"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../../lib/api/ApiContext";
import { BillingPlan, CreateBillingPlanRequest, UpdateBillingPlanRequest } from "@/types/billingPlans";

export const useBillingPlans = () => {
  const [loading, setLoading] = useState(false);
  const [billingPlans, setBillingPlans] = useState<BillingPlan[]>();
  const api = useApi();

  useEffect(() => {
    getBillingPlans();
  }, []);

  const getBillingPlans = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.getBillingPlans();
      setBillingPlans(response);
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
    loading,
  };
};
