"use client";

import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../../lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { Company, CreateCompanyRequest } from "@/types/companies";

export const useCompanies = () => {
  const router = useRouter();
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
