"use client";

import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/ui/Loader";
import { useCustomObjectDefinition } from "./useCustomObjectDefinition";
import { cardClass, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import { TextArea } from "@/app/ui/TextArea/TextArea";
import { Check, Close, Edit } from "@/app/ui/Icons";

interface CustomObjectDefinitionDashboardProps {
  customObjectDefinitionId: string;
}

const CustomObjectDefinitionDashboard: FC<CustomObjectDefinitionDashboardProps> = ({ customObjectDefinitionId }) => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [showEditDescription, setShowEditDescription] = useState(false);
  const { t } = useTranslation();
  const {
    customObjectDefinition,
    customObjects,
    loading
  } = useCustomObjectDefinition(customObjectDefinitionId);

  return !customObjectDefinition ? null : (
    <>
      <Heading
        title={customObjectDefinition.name}
        topLabel={t("custom_object")}
        placeholder={t("custom_object_name")}
        onEdit={(name) => {

        }}
      />
      <div className={cardClass}>
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
      </div>
      {loading && <Loader />}
    </>
  );
};

export default CustomObjectDefinitionDashboard;
