"use client";

import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCompany } from "../companies/[companyId]/useCompany";
import { buttonColor, cardClass, errorColor1, fontColor3 } from "@/lib/constants";
import { AnnotationCheck, Edit, Hardhat, Info, Plus } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { Button } from "@/app/ui/Button/Button";
import LineChannelSecretModal from "../companies/[companyId]/LineChannelSecretModal";
import LineChannelAccessTokenModal from "../companies/[companyId]/LineChannelAccessTokenModal";
import { Loader } from "@/app/ui/Loader";
import LineWebhookModal from "../companies/[companyId]/LineWebhookModal";
import LineWebhookButton from "../companies/[companyId]/LineWebhookButton";
import { Input } from "@/app/ui/Input/Input";
import Link from "next/link";
import CreateConversationItemTypeModal from "./CreateConversationItemTypeModal";
import styles from "./page.module.css";
import EditConversationItemTypeModal from "./EditConversationItemTypeModal";
import ConfirmDeleteModal from "../projects/[projectId]/ConfirmDeleteModal";
import { ConversationItemType } from "@/types";
import { useConversationItemTypes } from "@/lib/useConversationItemTypes";

interface LineDashboardProps {
  companyId: string;
}

const LineDashboard: FC<LineDashboardProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const {
    company,
    updateLineChannelSecret,
    updateLineChannelAccessToken,
  } = useCompany(companyId);
  const {
    conversationItemTypes,
    createConversationItemType,
    updateConversationItemType,
    deleteConversationItemType,
  } = useConversationItemTypes(companyId);
  const [channelSecret, setChannelSecret] = useState("");
  const [showChannelSecret, setShowChannelSecret] = useState(false);
  const [channelAccessToken, setChannelAccessToken] = useState("");
  const [showChannelAccessToken, setShowChannelAccessToken] = useState(false);
  const [showSaveButtons, setShowSaveButtons] = useState(false);
  const [showWebhook, setShowWebhook] = useState(false);
  const [showCreateConversationItemType, setShowCreateConversationItemType] = useState(false);
  const [editConversationItemType, setEditConversationItemType] = useState<ConversationItemType>();
  const [conversationItemTypeToDelete, setConversationItemTypeToDelete] = useState<ConversationItemType>();

  useEffect(() => {
    if (!company) return;

    setTimeout(() => {
      setShowSaveButtons(true);
    }, 5);
  }, [company]);

  if (!company) {
    return (
      <Loader />
    );
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <>
      <div className={cardClass}>
        <div className="md:px-3 flex items-center gap-3" style={{ color: fontColor3, minHeight: 50 }}>
          <div>
            <Info color={fontColor3} />
          </div>
          <div>
            LINE連携の設定方法については、<Link href="/docs/line-setup" target="_blank" rel="noopener noreferrer" style={{ color: buttonColor }}>セットアップガイド</Link>をご覧ください。
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
              {showSaveButtons && (
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
        <div className="flex items-center justify-between gap-3 py-1">
          {!company?.line_channel_access_token_last5 ? (
            <div className="flex flex-1 md:px-2">
              <Input
                placeholder={t("channel_access_token")}
                value={channelAccessToken}
                onChange={(t) => setChannelAccessToken(t)}
                style={{ height: 50, paddingRight: 110 }}
              />
              {showSaveButtons && (
                <Button
                  label={t("save")}
                  disabled={!channelAccessToken}
                  style={{ height: 50, width: 100, marginLeft: -100, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, zIndex: 100 }}
                  onClick={() => {
                    updateLineChannelAccessToken(channelAccessToken);
                  }}
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 md:px-4">
                <div>
                  {`${t("channel_access_token")}: ••••${company.line_channel_access_token_last5}`}
                </div>
                <Button
                  variant="tertiary"
                  iconLeft={() => <Edit />}
                  onClick={() => {
                    setShowChannelAccessToken(true);
                  }}
                />
              </div>
              {company.line_channel_access_token_invalid && (
                <div className="md:px-4" style={{ fontSize: 14, color: errorColor1 }}>
                  {t("channel_access_token_invalid_description")}
                </div>
              )}
            </div>
          )}
        </div>
        <Divider />
        <div className="md:px-4 py-1">
          <LineWebhookButton companyId={companyId} />
        </div>
      </div>
      <div className="flex justify-between mt-12">
        <div className="self-end">{t("conversation_item_types")}</div>
        <Button
          variant="tertiary"
          label={t("create")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateConversationItemType(true);
          }}
          style={{ height: "auto" }}
          iconOnlyMobile
        />
      </div>
      <div className={cardClass}>
        {conversationItemTypes.length === 0 && (
          <div className={styles.empty}>
            {t("empty_conversation_item_types_description")}
          </div>
        )}
        {conversationItemTypes.map((c, i) => (
          <div key={c.id}>
            {i > 0 && <Divider />}
            <div
              onClick={() => {
                setEditConversationItemType(c);
              }}
              className="hover:opacity-50 cursor-pointer"
            >
              <div className="md:mx-3">
                <div className="flex items-center justify-between gap-4">
                  <div
                    style={{ minHeight: 60, minWidth: 0 }}
                    className="flex flex-1 items-center gap-4 py-1"
                  >
                    <div className="hidden md:block">
                      <AnnotationCheck />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div>{c.name}</div>
                      <div className={styles.subtitle}>
                        {truncateText(c.description, 100)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
      <LineChannelAccessTokenModal
        isOpen={showChannelAccessToken}
        onClose={() => {
          setShowChannelAccessToken(false);
        }}
        onSubmit={async (token) => {
          await updateLineChannelAccessToken(token);
        }}
      />
      <LineWebhookModal
        companyId={companyId}
        isOpen={showWebhook}
        onClose={() => {
          setShowWebhook(false);
        }}
      />
      <CreateConversationItemTypeModal
        isOpen={showCreateConversationItemType}
        onClose={() => {
          setShowCreateConversationItemType(false);
        }}
        onCreate={(name, description) => {
          setShowCreateConversationItemType(false);
          createConversationItemType({ name, description });
        }}
      />
      <EditConversationItemTypeModal
        conversationItemType={editConversationItemType}
        isOpen={!!editConversationItemType}
        onClose={() => {
          setEditConversationItemType(undefined);
        }}
        onSubmit={(name, description) => {
          if (editConversationItemType) {
            updateConversationItemType(
              editConversationItemType.id,
              { name, description }
            );
          }
        }}
        onDelete={(conversationItemType) => {
          setEditConversationItemType(undefined);

          setTimeout(() => {
            setConversationItemTypeToDelete(conversationItemType);
          }, 500);
        }}
      />
      <ConfirmDeleteModal
        isOpen={!!conversationItemTypeToDelete}
        onClose={() => {
          setConversationItemTypeToDelete(undefined);
        }}
        onDelete={() => {
          if (conversationItemTypeToDelete) {
            deleteConversationItemType(conversationItemTypeToDelete.id);
          }

          setConversationItemTypeToDelete(undefined);
        }}
      />
    </>
  );
}

export default LineDashboard;
