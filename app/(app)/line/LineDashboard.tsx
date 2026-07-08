"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCompany } from "../companies/[companyId]/useCompany";
import { buttonColor, cardClass, fontColor2, fontColor3 } from "@/lib/constants";
import { Edit, Hardhat, Info } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { Button } from "@/app/ui/Button/Button";
import LineChannelSecretModal from "../companies/[companyId]/LineChannelSecretModal";
import { Loader } from "@/app/ui/Loader";
import LineWebhookModal from "../companies/[companyId]/LineWebhookModal";
import LineWebhookButton from "../companies/[companyId]/LineWebhookButton";
import { Input } from "@/app/ui/Input/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProjects } from "../projects/useProjects";
import LineLinkCodeButton from "@/app/ui/LineLinkCodeButton";

interface LineDashboardProps {
  companyId: string;
}

const LineDashboard: FC<LineDashboardProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const { company, updateLineChannelSecret, loading } = useCompany(companyId);
  const { projects } = useProjects();
  const [channelSecret, setChannelSecret] = useState("");
  const [showChannelSecret, setShowChannelSecret] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showWebhook, setShowWebhook] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!company) return;

    setTimeout(() => {
      setShowSaveButton(true);
    }, 5);
  }, [company]);

  const unlinkedProjects = useMemo(() => {
    return projects.filter((p) => !p.line_group_id);
  }, [projects]);

  if (!company) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <div className={cardClass}>
        <div className="md:px-3 flex items-center gap-3" style={{ color: fontColor3, minHeight: 50 }}>
          <div>
            <Info color={fontColor3} />
          </div>
          <div>
            LINE連携の設定方法については、<Link href="/docs/line" target="_blank" rel="noopener noreferrer" style={{ color: buttonColor }}>セットアップガイド</Link>をご覧ください。
          </div>
        </div>
        <Divider />
        <div className="flex items-center justify-between gap-3 py-1">
          {!company?.line_channel_secret_last4 ? (
            <div className="flex flex-1 md:px-2">
              <Input
                placeholder={t("channel_secret")}
                value={channelSecret}
                onChange={(t) => setChannelSecret(t)}
                style={{ height: 50, paddingRight: 110 }}
              />
              {showSaveButton && (
                <Button
                  label={t("save")}
                  disabled={!channelSecret}
                  style={{ height: 50, width: 100, marginLeft: -100, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, zIndex: 100 }}
                  onClick={() => {
                    updateLineChannelSecret(channelSecret);
                  }}
                />
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 md:px-4">
              <div>
                {`${t("channel_secret")}: ••••${company.line_channel_secret_last4}`}
              </div>
              <Button
                variant="tertiary"
                iconLeft={() => <Edit />}
                onClick={() => {
                  setShowChannelSecret(true);
                }}
              />
            </div>
          )}
        </div>
        <Divider />
        <div className="md:px-4 py-1">
          <LineWebhookButton companyId={companyId} />
        </div>
      </div>
      <LineChannelSecretModal
        isOpen={showChannelSecret}
        onClose={() => {
          setShowChannelSecret(false);
        }}
        onSubmit={async (secret) => {
          const shouldShowWebhook = !company?.line_channel_secret_last4;

          const success = await updateLineChannelSecret(secret);

          if (success && shouldShowWebhook) {
            setShowWebhook(true);
          }
        }}
      />
      {unlinkedProjects.length > 0 && (
        <>
          <div className="mt-12">
            {t("unlinked_projects")}
          </div>
          <div className={cardClass}>
            {unlinkedProjects.map((p, i) => (
              <>
                {i > 0 && <Divider />}
                <div className="md:px-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Hardhat />
                    <div>
                      {p.name}
                    </div>
                  </div>
                  <LineLinkCodeButton shorten code={p.line_link_code} />
                </div>
              </>
            ))}
          </div>
        </>
      )}
      <LineWebhookModal
        companyId={companyId}
        isOpen={showWebhook}
        onClose={() => {
          setShowWebhook(false);
        }}
      />
      {loading && <Loader />}
    </>
  );
}

export default LineDashboard;
