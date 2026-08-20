"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/ui/Loader";
import { useCustomObjectDefinition } from "./useCustomObjectDefinition";
import { cardClass, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { Check, Close, Edit, Plus } from "@/app/ui/Icons";
import styles from "./page.module.css";
import { Input } from "@/app/ui/Input/Input";
import Divider from "@/app/ui/Divider";

interface CustomObjectDefinitionDashboardProps {
  customObjectDefinitionId: string;
}

const CustomObjectDefinitionDashboard: FC<CustomObjectDefinitionDashboardProps> = ({ customObjectDefinitionId }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showEditName, setShowEditName] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showCreateField, setShowCreateField] = useState(false);
  const { t } = useTranslation();
  const {
    customObjectDefinition,
    customObjects,
    loading
  } = useCustomObjectDefinition(customObjectDefinitionId);

  useEffect(() => {
    setName(customObjectDefinition?.name ?? "");
  }, [customObjectDefinition?.name]);

  useEffect(() => {
    setDescription(customObjectDefinition?.description ?? "");
  }, [customObjectDefinition?.description]);

  return !customObjectDefinition ? null : (
    <>
      <div className="flex justify-between items-end">
        <Heading
          title={customObjectDefinition.name}
          topLabel={t("custom_object")}
        />
        <Button
          variant="tertiary"
          label={t("create")}
          iconLeft={() => <Plus />}
          onClick={() => {

          }}
          style={{ height: "auto" }}
          iconOnlyMobile
        />
      </div>
      <div className={cardClass}>
        {!customObjects.length ? (
          <div className={styles.empty}>
            {t("empty_description")}
          </div>
        ) : (
          <div>
            {customObjects.map((o) => (
              <div></div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between mt-12">
        <div className="self-end">{t("custom_object_settings")}</div>
        <Button
          variant="tertiary"
          label={t("create_field")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateField(true);
          }}
          style={{ height: "auto" }}
          iconOnlyMobile
        />
      </div>
      <div className={cardClass}>
        {showEditName ? (
          <div className="flex flex-col">
            <Input
              value={name}
              placeholder={t("name")}
              onChange={setName}
            />
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginTop: 12,
                marginBottom: 6,
                gap: 24,
              }}
            >
              <Button
                variant="tertiary"
                iconLeft={() => <Check />}
                style={{ height: "auto" }}
                label={t("update")}
                onClick={() => {
                  // call update
                  setShowEditName(false);
                }}
              />
              <Button
                variant="tertiary"
                iconLeft={() => (
                  <div style={{ marginRight: -3 }}>
                    <Close color={errorColor1} />
                  </div>
                )}
                style={{ height: "auto" }}
                label={t("cancel")}
                onClick={() => {
                  setName(customObjectDefinition.name ?? "");
                  setShowEditName(false);
                }}
                textStyle={{ color: errorColor1 }}
              />
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="p-1 md:p-3 flex flex-1" style={{ color: !description ? fontColor2 : fontColor1 }}>
              {name ?? ""}
            </div>
            <div
              className="cursor-pointer pt-1 md:pt-3 md:pr-3"
              onClick={() => {
                setShowEditName(true);
              }}
            >
              <Edit />
            </div>
          </div>
        )}
        <Divider />
        {showEditDescription ? (
          <div className="flex flex-col">
            <TextArea
              value={description}
              placeholder={t("description")}
              onChange={setDescription}
            />
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginTop: 12,
                marginBottom: 6,
                gap: 24,
              }}
            >
              <Button
                variant="tertiary"
                iconLeft={() => <Check />}
                style={{ height: "auto" }}
                label={t("update")}
                onClick={() => {
                  // call update
                  setShowEditDescription(false);
                }}
              />
              <Button
                variant="tertiary"
                iconLeft={() => (
                  <div style={{ marginRight: -3 }}>
                    <Close color={errorColor1} />
                  </div>
                )}
                style={{ height: "auto" }}
                label={t("cancel")}
                onClick={() => {
                  setDescription(customObjectDefinition.description);
                  setShowEditDescription(false);
                }}
                textStyle={{ color: errorColor1 }}
              />
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="p-1 md:p-3 flex flex-1" style={{ color: !description ? fontColor2 : fontColor1 }}>
              {description || t("add_description")}
            </div>
            <div
              className="cursor-pointer pt-1 md:pt-3 md:pr-3"
              onClick={() => {
                setShowEditDescription(true);
              }}
            >
              <Edit />
            </div>
          </div>
        )}
        {!!customObjects.length && (
          <>
            <Divider />

          </>
        )}
      </div>
      {loading && <Loader />}
    </>
  );
};

export default CustomObjectDefinitionDashboard;
