import { useMemo } from "react";

export const useFeatures = () => {
  const isDev = useMemo(() => {
    return process.env.NEXT_PUBLIC_SITE_URL?.includes("dev") ?? false;
  }, [process.env.NEXT_PUBLIC_SITE_URL])

  const isFormsEnabled = useMemo(() => {
    return isDev;
  }, [isDev]);

  return {
    isFormsEnabled,
  };
};
