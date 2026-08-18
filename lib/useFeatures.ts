import { useMemo } from "react";

export const useFeatures = () => {
  const isDev = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SITE_URL;
    if (!url) return false;

    const hasDev = url.includes("dev");
    const hasLocalhost = url.includes("localhost");
    return hasDev || hasLocalhost;
  }, [process.env.NEXT_PUBLIC_SITE_URL])

  const isFormsEnabled = useMemo(() => {
    return isDev;
  }, [isDev]);

  return {
    isFormsEnabled,
  };
};
