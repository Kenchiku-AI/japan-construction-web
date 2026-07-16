"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCompany } from "../companies/[companyId]/useCompany";
import { buttonColor, cardClass, fontColor3 } from "@/lib/constants";
import { AnnotationCheck, Edit, Hardhat, Info, Plus } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { Button } from "@/app/ui/Button/Button";
import LineChannelSecretModal from "../companies/[companyId]/LineChannelSecretModal";
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

interface LineDashboardProps {
  companyId: string;
}

const LineDashboard: FC<LineDashboardProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const {
    company,
    updateLineChannelSecret,
    createConversationItemType,
    updateConversationItemType,
    deleteConversationItemType,
    loading
  } = useCompany(companyId);
  const [channelSecret, setChannelSecret] = useState("");
  const [showChannelSecret, setShowChannelSecret] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showWebhook, setShowWebhook] = useState(false);
  const [showCreateConversationItemType, setShowCreateConversationItemType] = useState(false);
  const [editConversationItemType, setEditConversationItemType] = useState<ConversationItemType>();
  const [conversationItemTypeToDelete, setConversationItemTypeToDelete] = useState<ConversationItemType>();

  useEffect(() => {
    if (!company) return;

    setTimeout(() => {
      setShowSaveButton(true);
    }, 5);
  }, [company]);

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
        {company.conversation_item_types.length === 0 && (
          <div className={styles.empty}>
            {t("empty_conversation_item_types_description")}
          </div>
        )}
        {company.conversation_item_types.map((c, i) => (
          <div key={c.id}>
            {i > 0 && <Divider />}
            <div className="md:px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="hidden md:block">
                  <AnnotationCheck />
                </div>
                <div>
                  {c.name}
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
          if (conversationItemToDelete) {
            deleteConversationItem(conversationItemToDelete.id);
          }

          setConversationItemToDelete(undefined);
        }}
      />
      {loading && <Loader />}
    </>
  );
}

export default LineDashboard;
