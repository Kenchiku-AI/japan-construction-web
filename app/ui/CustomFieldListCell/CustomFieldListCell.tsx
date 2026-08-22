"use client";

import { FC, useState } from "react";
import { CustomFieldListItem } from "@/types";
import { Check, Close, Edit } from "../Icons";
import styles from "./CustomFieldListCell.module.css";
import { Input } from "../Input/Input";
import { errorColor1, fontColor1 } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";
import { FieldsListInput, FieldsListInputProps } from "@/app/(app)/custom-objects/[customObjectDefinitionId]/FieldsListInput";

type CustomFieldListCellProps = FieldsListInputProps & {
  item: CustomFieldListItem;
  onEdit: () => void;
}

const CustomFieldListCell: FC<CustomFieldListCellProps> = ({ item, onEdit }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="flex">
      {showEdit ? (
        <EditCustomFieldListCell
          item={item}
          onEdit={onEdit}
        />
      ) : (
        <div className="p-1 md:py-2 md:px-3 flex flex-1">
          <div>
            <div className={styles.label}>{item.definition.name}</div>
            <div style={{ color: fontColor1 }}>
              {/* display goes here */}
            </div>
          </div >
        </div >
      )}
      <div
        className="cursor-pointer md:pr-3 mt-4"
        onClick={() => {
          setShowEdit(true);
        }}
      >
        <Edit />
      </div>
    </div>
  );


};


const EditCustomFieldListCell: FC<CustomFieldListCellProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <FieldsListInput

      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginTop: 12,
          marginBottom: 6,
          marginRight: 12,
          gap: 24,
        }}
      >
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

          }}
          textStyle={{ color: errorColor1 }}
        />
        <Button
          variant="tertiary"
          iconLeft={() => <Check />}
          style={{ height: "auto" }}
          label={t("update")}
          disabled={false}
          onClick={() => {

          }}
        />
      </div>
    </div>
  )
}
