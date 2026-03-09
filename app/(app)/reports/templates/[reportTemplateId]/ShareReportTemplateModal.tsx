import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { Company } from "@/types";
import debounce from "lodash.debounce";
import { useApi } from "@/lib/api/ApiContext";
import { Users } from "@/app/ui/Icons";
import styles from "./page.module.css";
import Divider from "@/app/ui/Divider";
import { fontColor2 } from "@/lib/constants";

interface ShareReportTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (companyId: string) => void;
}

const ShareReportTemplateModal: FC<ShareReportTemplateModalProps> = ({
  isOpen,
  onClose,
  onShare,
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { getCompanies, searchCompanies } = useApi();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const response = await getCompanies();
        setCompanies(response ?? []);
      } finally {
      }
    })();
  }, []);

  const reset = () => {
    setTimeout(() => {
      setCompanies([]);
    }, 500);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.length < 3) {
          setCompanies([]);
          return;
        }

        try {
          const response = await searchCompanies(query);
          setCompanies(response ?? []);
        } finally {
        }
      }, 400),
    [],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("share_report_template")}
      subtitle={t("share_report_template_description")}
    >
      <div className="mt-6">
        <Input
          placeholder={t("search_companies")}
          onChange={(q) => debouncedSearch(q)}
          hideLabel
        />
      </div>
      <div className="mt-6 mb-2">
        {!companies.length && (
          <div className={styles.empty}>
            {t("empty_companies_search_description")}
          </div>
        )}
        {companies.map((c) => (
          <div key={c.id}>
            <div
              onClick={() => {
                onShare(c.id);
                reset();
                onClose();
              }}
              className="hover:opacity-50 cursor-pointer mx-4"
            >
              <div className="flex items-center justify-between">
                <div style={{ height: 68 }} className="flex items-center gap-4">
                  <Users />
                  <div className="flex flex-col">
                    <div className="text-xl">{c.name}</div>
                    <div className={styles.subtitle}>{c.corporate_number}</div>
                  </div>
                </div>
              </div>
            </div>
            <Divider color={fontColor2} />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ShareReportTemplateModal;
