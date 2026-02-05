"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api/ApiContext";
import { Company, CreateCompanyRequest } from "@/types/companies";

export const useCompany = (companyId: string) => {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<Company>();
  const api = useApi();

  useEffect(() => {
    getCompany(companyId);
  }, [companyId]);

  const getCompany = useCallback(
    async (companyId: string) => {
      setLoading(true);

      try {
        const response = await api.getCompany(companyId);
        setCompany(response);
      } finally {
        setLoading(false);
      }
    },
    [setCompany],
  );

  return {
    loading,
    company,
  };
};
