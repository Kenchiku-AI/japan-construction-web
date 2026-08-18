"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { Heading } from "@/app/ui/Heading/Heading";
import { useTranslation } from "react-i18next";
import { Plus } from "@/app/ui/Icons";
import { useApi } from "@/lib/api/ApiContext";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/ui/Loader";
import { useFeatures } from "@/lib/useFeatures";
import { cardClass } from "@/lib/constants";
import CustomFieldsList from "./CustomFieldsList";
import { useCustomFields } from "./useCustomFields";
import CreateCustomFieldModal from "./CreateCustomFieldModal";
import EditCustomFieldModal from "./EditCustomFieldModal";
import { CustomFieldDefinition } from "@/types";
import CustomObjectsList from "./CustomObjectsList";

interface CustomInfoDashboardProps {
  companyId: string;
}

const CustomInfoDashboard: FC<CustomInfoDashboardProps> = ({ companyId }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isFormsEnabled } = useFeatures();
  const { currentUser } = useApi();
  const {
    companyFields,
    projectFields,
    userFields,
    customObjects,
    loading
  } = useCustomFields(companyId);
  const [showLoader, setShowLoader] = useState(false);
  const [showCreateCustomObject, setShowCreateCustomObject] = useState(false);
  const [createCustomFieldType, setCreateCustomFieldType] = useState("");
  const [editCustomField, setEditCustomField] = useState<CustomFieldDefinition>();

  useEffect(() => {
    if (!isFormsEnabled) {
      router.push("/home");
    }
  }, [isFormsEnabled]);

  return !currentUser ? null : (
    <>
      <div className="flex justify-between items-end">
        <Heading title={t("custom_info")} />
        <Button
          variant="tertiary"
          label={t("create_custom_object")}
          iconLeft={() => <Plus />}
          onClick={() => {
            setShowCreateCustomObject(true);
          }}
          style={{ height: "auto" }}
          iconOnlyMobile
        />
      </div>
      <div className={cardClass}>
        <CustomObjectsList
          objects={customObjects}
          isEmpty={customObjects.length === 0 && !loading}
          onClickObject={(o) => {

          }}
        />
      </div>
      <div>
        {/* Company */}
        <div className="flex justify-between mt-12">
          <div className="self-end">{t("custom_company_fields")}</div>
          <Button
            variant="tertiary"
            label={t("create_custom_company_field")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setCreateCustomFieldType("company");
            }}
            style={{ height: "auto" }}
            iconOnlyMobile
          />
        </div>
        <div className={cardClass}>
          <CustomFieldsList
            fields={companyFields}
            isEmpty={companyFields.length === 0 && !loading}
            onClickField={(f) => {
              setEditCustomField(f);
            }}
          />
        </div>

        {/* User */}
        <div className="flex justify-between mt-12">
          <div className="self-end">{t("custom_user_fields")}</div>
          <Button
            variant="tertiary"
            label={t("create_custom_user_field")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setCreateCustomFieldType("user");
            }}
            style={{ height: "auto" }}
            iconOnlyMobile
          />
        </div>
        <div className={cardClass}>
          <CustomFieldsList
            fields={userFields}
            isEmpty={userFields.length === 0 && !loading}
            onClickField={(f) => {
              setEditCustomField(f);
            }}
          />
        </div>

        {/* Project */}
        <div className="flex justify-between mt-12">
          <div className="self-end">{t("custom_project_fields")}</div>
          <Button
            variant="tertiary"
            label={t("create_custom_project_field")}
            iconLeft={() => <Plus />}
            onClick={() => {
              setCreateCustomFieldType("project");
            }}
            style={{ height: "auto" }}
            iconOnlyMobile
          />
        </div>
        <div className={cardClass}>
          <CustomFieldsList
            fields={projectFields}
            isEmpty={projectFields.length === 0 && !loading}
            onClickField={(f) => {
              setEditCustomField(f);
            }}
          />
        </div>
      </div>
      <CreateCustomFieldModal
        isOpen={!!createCustomFieldType}
        ownerType={createCustomFieldType}
        onClose={() => {
          setCreateCustomFieldType("");
        }}
        onCreateField={() => {
          setCreateCustomFieldType("");
        }}
      />
      <EditCustomFieldModal
        isOpen={!!editCustomField}
        field={editCustomField}
        onClose={() => {
          setEditCustomField(undefined);
        }}
        onSubmit={() => {
          setEditCustomField(undefined);
        }}
      />
      {showLoader && <Loader />}
    </>
  );
};

export default CustomInfoDashboard;
