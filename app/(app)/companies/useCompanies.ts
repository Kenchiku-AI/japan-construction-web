"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../../lib/api/ApiContext";
import { Company, CreateCompanyRequest } from "@/types/companies";
import posthog from "posthog-js";

export const useCompanies = () => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>();
  const api = useApi();

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.getCompanies();
      setCompanies(response);
    } finally {
      setLoading(false);
    }
  }, [setCompanies]);

  const createCompany = useCallback(
    async (request: CreateCompanyRequest) => {
      setLoading(true);

      try {
        await api.createCompany(request);
        if (
          process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
          process.env.NEXT_PUBLIC_POSTHOG_HOST
        ) {
          posthog.capture("company_created");
        }
        await getCompanies();
      } finally {
        setLoading(false);
      }
    },
    [getCompanies],
  );

  return {
    loading,
    companies,
    createCompany,
  };
};
