import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { Conversation, ConversationItemType } from "@/types";
import Divider from "@/app/ui/Divider";
import { buttonColor, errorColor1, fontColor1, fontColor3, hideQRCodeKey } from "@/lib/constants";
import { Check, DownChevron, Trash, UpChevron } from "@/app/ui/Icons";
import LineLinkCodeButton from "@/app/ui/LineLinkCodeButton";
import QRCode from "react-qr-code";

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
      setHideQRCode(!!conversation.line_group_id);
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
        {!!conversation && (
          <>
            <Divider />
            <div className="mx-3">
              <LineLinkCodeButton code={conversation.line_link_code} />
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
        <div className="pt-6">
          <Input
            value={name}
            placeholder={t("name")}
            onChange={(n) => {
              setName(n);
            }}
          />
        </div>
        {(conversationItemTypes?.length ?? 0) > 0 && (
          <div className="mt-8">
            <div style={{ color: fontColor3 }}>{t("conversation_item_types")}</div>
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
        )}
      </div>
      {!!conversation ? (
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
      )}
    </Modal>
  );
};

export default ConversationModal;
