import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { Conversation, ConversationItemType } from "@/types";
import Divider from "@/app/ui/Divider";
import { bgColor3, bgColor4, bgColor5, buttonColor, errorColor1, errorColor2, fontColor1, fontColor2, fontColor3, hideQRCodeKey } from "@/lib/constants";
import { Check, DownChevron, Info, Trash, UpChevron } from "@/app/ui/Icons";
import LineLinkCodeButton from "@/app/ui/LineLinkCodeButton";
import QRCode from "react-qr-code";
import Link from "next/link";
import { useIsMobile } from "@/lib/useIsMobile";

interface ConversationModalProps {
  conversation?: Conversation;
  conversationItemTypes: ConversationItemType[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, itemTypes: ConversationItemType[]) => void;
  onDelete: () => void;
}

const ConversationModal: FC<ConversationModalProps> = ({
  conversation,
  conversationItemTypes,
  isOpen,
  onClose,
  onSubmit,
  onDelete
}) => {
  const [name, setName] = useState("");
  const [selectedItemTypes, setSelectedItemTypes] = useState<ConversationItemType[]>([]);
  const [hideQRCode, setHideQRCode] = useState(false);
  const { isMobile } = useIsMobile();
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setSelectedItemTypes([]);
    }, 500);
  };

  useEffect(() => {
    if (!isOpen) return;

    if (conversation) {
      setName(conversation.name);
      setSelectedItemTypes(conversation.item_types);
      setHideQRCode(!!conversation.line_chat_id);
    } else {
      setName("");
      setSelectedItemTypes(conversationItemTypes);
    }
  }, [isOpen, conversation]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={conversation ? t("update_conversation") : t("create_conversation")}
    >
      <div>
        <Divider />
        <Input
          value={name}
          placeholder={t("name")}
          onChange={(n) => {
            setName(n);
          }}
        />
        <Divider />
        {!!conversation && (
          <>
            <div className="mx-3">
              <LineLinkCodeButton
                code={conversation.line_link_code}
                shorten={isMobile}
              />
            </div>
            <Divider />
            <div className="hidden md:block">
              <div className={`collapse ${hideQRCode ? 'collapse-close' : 'collapse-open'}`}>
                <div className="collapse-content p-0">
                  <div
                    style={{
                      color: fontColor3,
                      textAlign: "center",
                      fontSize: 14,
                      paddingTop: 8
                    }}
                  >
                    {t("scan_to_copy")}
                  </div>
                  <div className="py-6" style={{ height: "auto", margin: "0 auto", maxWidth: 180, width: "100%" }}>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={`${process.env.NEXT_PUBLIC_SITE_URL}copy?code=${conversation.line_link_code}`}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              </div>
              <div className="mx-3">
                <Button
                  variant="tertiary"
                  label={hideQRCode ? t("show_qr_code") : t("hide_qr_code")}
                  onClick={() => {
                    setHideQRCode(!hideQRCode);
                  }}
                  iconLeft={() => hideQRCode ? <DownChevron color={buttonColor} /> : <UpChevron color={buttonColor} />}
                />
              </div>
              <Divider />
            </div>
          </>
        )}
        {(conversationItemTypes?.length ?? 0) > 0 ? (
          <div className="my-10">
            <div style={{ color: fontColor2, fontSize: 16 }}>{t("conversation_item_types")}</div>
            <Divider />
            {conversationItemTypes.map((c) => {
              const isChecked = selectedItemTypes.some((it) => it.id === c.id);

              return (
                <div key={c.id}>
                  <label className="label flex gap-4 mx-3 my-5" style={{ color: fontColor1 }}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-neutral"
                      checked={isChecked}
                      onChange={() => {
                        setSelectedItemTypes((prevSelected) => {
                          if (isChecked) {
                            return prevSelected.filter((p) => p.id !== c.id);
                          } else {
                            return [...prevSelected, c];
                          }
                        });
                      }}
                    />
                    {c.name}
                  </label>
                  <Divider />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-6 mt-6 rounded-lg flex gap-4 items-center" style={{ background: errorColor2 }} >
            <div>
              <Info color={errorColor1} />
            </div>
            <div style={{ color: errorColor1 }}>
              {t("empty_conversation_item_types_description")}
              <Link href="/line" style={{ color: buttonColor, fontWeight: "bold" }}>
                {t("line_integration")}
              </Link>
              {t("empty_conversation_item_types_description_extended")}
            </div>
          </div>
        )}
      </div>
      {
        !!conversation ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button
              disabled={!name}
              iconLeft={() => <Check color="white" />}
              label={t("update")}
              onClick={() => {
                onSubmit(name, selectedItemTypes);
                reset();
              }}
            />
            <Button
              variant="secondary"
              iconLeft={() => <Trash />}
              style={{ borderColor: errorColor1, height: 60 }}
              textStyle={{ color: errorColor1 }}
              label={t("delete")}
              onClick={onDelete}
            />
          </div>
        ) : (
          <Button
            disabled={!name}
            label={t("create")}
            onClick={() => {
              onSubmit(name, selectedItemTypes);
              reset();
            }}
          />
        )
      }
    </Modal >
  );
};

export default ConversationModal;
