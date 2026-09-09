"use client";

import { FC, useMemo, useState } from "react";
import { Check, Close, Edit, Plus } from "../Icons";
import { buttonColor, errorColor1, fontColor1, fontColor2 } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";
import { FieldsListInput, FieldsListInputProps } from "@/app/(app)/custom-objects/[customObjectDefinitionId]/FieldsListInput";
import { CustomFieldDataType, CustomFieldEntityType, CustomRelationshipDefinition } from "@/types";

type CustomFieldListCellProps = FieldsListInputProps & {
  onSubmit: () => void;
  onCancel: () => void;
  onCreateRelationshipObject?: (definitionId: string) => void;
  onEditRelationshipObject?: (objectId: string) => void;
  isEditable?: boolean;
}

const CustomFieldListCell: FC<CustomFieldListCellProps> = ({
  onSubmit,
  onCancel,
  onCreateRelationshipObject,
  onEditRelationshipObject,
  isEditable = true,
  ...props
}) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="flex flex-1 h-full">
      {showEdit ? (
        <EditCustomFieldListCell
          {...props}
          onSubmit={() => {
            setShowEdit(false);
            onSubmit();
          }}
          onCancel={() => {
            setShowEdit(false);
            onCancel();
          }}
          onCreateRelationshipObject={onCreateRelationshipObject}
          onEditRelationshipObject={onEditRelationshipObject}
        />
      ) : (
        <CustomFieldListLabel
          {...props}
          onEdit={() => {
            setShowEdit(true);
          }}
          isEditable={isEditable}
        />
      )}
    </div>
  );
};

type CustomFieldListLabelProps = FieldsListInputProps & {
  onEdit: () => void;
  isEditable?: boolean;
}

const CustomFieldListLabel: FC<CustomFieldListLabelProps> = ({
  onEdit,
  definition,
  fields,
  relationships,
  customObjectsByDefinition,
  projects,
  users,
  isEditable
}) => {
  const { t } = useTranslation();

  const label = useMemo(() => {
    if ("target_entity_type" in definition) {
      const targetIds = relationships?.[definition.id];
      if (!targetIds?.length) return "";

      if (definition.target_entity_type === CustomFieldEntityType.Project) {
        const projectNames = targetIds.map((id) => (
          projects.find((p) => p.id === id)?.name
        ));
        return projectNames.filter(Boolean).join(", ");
      }

      if (definition.target_entity_type === CustomFieldEntityType.User) {
        const userNames = targetIds.map((id) => {
          const user = users.find((u) => u.id === id);
          return !user ? undefined : `${user.last_name} ${user.first_name}`;
        });
        return userNames.filter(Boolean).join(", ");
      }

      const entityDefinitionId = definition.target_custom_object_definition_id;
      if (!entityDefinitionId) return "";

      const customObjects = customObjectsByDefinition?.[entityDefinitionId]?.objects;
      const selectedObjects = customObjects?.filter((o) => targetIds.includes(o.id));
      return selectedObjects?.map((o) => o.name).join(", ") ?? "";
    }

    if (definition.data_type === CustomFieldDataType.Boolean) {
      return t(fields?.[definition.id] === "true" ? "enabled" : "disabled");
    }

    return fields?.[definition.id] ?? "";
  }, [
    definition,
    fields,
    relationships,
    customObjectsByDefinition,
    projects,
    users,
    t
  ]);

  return (
    <div
      className="flex flex-1 items-center"
      style={{ minHeight: 60 }}
    >
      <div className="md:px-3 flex flex-1">
        <div>
          <div
            style={{
              color: fontColor2,
              fontSize: !label ? 18 : 12
            }}>
            {definition.name}
          </div>
          {!!label && (
            <div style={{ color: fontColor1 }}>
              {label}
            </div>
          )}
        </div >
      </div >
      {isEditable && (
        <div
          className="cursor-pointer md:pr-3"
          onClick={onEdit}
        >
          <Edit />
        </div>
      )}
    </div>
  )
}

type EditCustomFieldListCellProps = CustomFieldListCellProps & {
  onCreateRelationshipObject?: (definitionId: string) => void;
  onEditRelationshipObject?: (objectId: string) => void;
}


const EditCustomFieldListCell: FC<EditCustomFieldListCellProps> = ({
  onSubmit,
  onCancel,
  onCreateRelationshipObject,
  onEditRelationshipObject,
  ...props
}) => {
  const { t } = useTranslation();
  const { definition } = props;

  const isRelationshipWithObject = useMemo(() => {
    const isRelationship = "target_entity_type" in definition;
    if (!isRelationship) return false;

    const relDef = (definition as CustomRelationshipDefinition);
    return !!relDef.target_custom_object_definition_id;
  }, [props.definition]);

  const isSourceOwner = useMemo(() => {
    if (!isRelationshipWithObject) return false;

    const relDef = (definition as CustomRelationshipDefinition);
    return !!relDef.is_source_owner;
  }, [isRelationshipWithObject]);

  const createObject = () => {
    const relDef = (props.definition as CustomRelationshipDefinition);
    const definitionId = relDef.target_custom_object_definition_id as string;
    onCreateRelationshipObject?.(definitionId);
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      {(isRelationshipWithObject && !isSourceOwner) &&
        <div className="pb-3 pr-2 flex justify-end">
          <Button
            variant="tertiary"
            label={t("create_object", { name: props.definition.name })}
            iconLeft={() => <Plus />}
            onClick={createObject}
            style={{ height: "auto" }}
          />
        </div>
      }
      <FieldsListInput
        {...props}
        onEditRelationshipObject={onEditRelationshipObject}
      />
      <div
        style={{
          display: "flex",
          marginTop: 12,
          marginBottom: 6,
          marginLeft: 6,
          gap: 24,
        }}
      >
        {isSourceOwner ? (
          <Button
            variant="tertiary"
            label={t("create_object", { name: props.definition.name })}
            iconLeft={() => <Plus />}
            onClick={createObject}
            style={{ height: "auto" }}
          />
        ) : (
          <Button
            variant="tertiary"
            iconLeft={() => <Check />}
            style={{ height: "auto" }}
            label={t("update")}
            onClick={onSubmit}
          />
        )}
        <Button
          variant="tertiary"
          iconLeft={() => (
            <div style={{ marginRight: -3 }}>
              <Close color={isSourceOwner ? buttonColor : errorColor1} />
            </div>
          )}
          style={{ height: "auto" }}
          label={t(isSourceOwner ? "close" : "cancel")}
          onClick={onCancel}
          textStyle={{ color: isSourceOwner ? buttonColor : errorColor1 }}
        />
      </div>
    </div>
  )
}

export default CustomFieldListCell;