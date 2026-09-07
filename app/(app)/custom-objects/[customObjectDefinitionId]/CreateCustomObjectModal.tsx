import { FC, useCallback, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import {
  CustomObjectDefinitionDetail,
  CustomObjectsByDefinition,
  Project,
  UserOrGuest
} from "@/types";
import Divider from "@/app/ui/Divider";
import { FieldsListInput } from "./FieldsListInput";

interface CreateCustomObjectModalProps {
  definition?: CustomObjectDefinitionDetail;
  projects: Project[];
  users: UserOrGuest[];
  customObjectsByDefinition: CustomObjectsByDefinition;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (fields: Record<string, string>, relationships: Record<string, string[]>) => void;
}

const CreateCustomObjectModal: FC<CreateCustomObjectModalProps> = ({
  definition,
  projects,
  users,
  customObjectsByDefinition,
  isOpen,
  onClose,
  onCreate,
}) => {
  const { t } = useTranslation();
  const [fields, setFields] = useState<Record<string, string>>({});
  const [relationships, setRelationships] = useState<Record<string, string[]>>({});

  const fieldDefinitions = useMemo(() => {
    if (!definition) return [];

    return [
      ...definition.fields,
      ...definition.relationships
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [definition]);

  const closeAndReset = useCallback(() => {
    onClose();
    setTimeout(() => {
      setFields({});
      setRelationships({});
    }, 500);
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndReset}
      title={definition ? t("create_custom_object_modal_title", { name: definition.name }) : t("create")}
    >
      <div className="my-8 flex flex-col">
        {fieldDefinitions.map((definition, i) => (
          <div key={definition.id}>
            {i > 0 && <Divider />}
            <FieldsListInput
              fields={fields}
              relationships={relationships}
              definition={definition}
              projects={projects}
              users={users}
              customObjectsByDefinition={customObjectsByDefinition}
              onFieldChange={(value) => {
                setFields((prev) => ({
                  ...prev,
                  [definition.id]: value
                }));
              }}
              onRelationshipChange={(value) => {
                setRelationships((prev) => ({
                  ...prev,
                  [definition.id]: value
                }));
              }}
            />
          </div>
        ))}
      </div>
      <Button
        label={t("create")}
        onClick={() => {
          onCreate(fields, relationships);
          closeAndReset();
        }}
      />
    </Modal>
  );
};

export default CreateCustomObjectModal;
