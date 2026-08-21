import { FC, useCallback, useMemo, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Modal from "@/app/ui/Modal";
import { CustomFieldEntityType, CustomObject, CustomObjectDefinitionDetail, CustomRelationship, CustomRelationshipType, Project, User } from "@/types";
import { Input } from "@/app/ui/Input/Input";
import Select from "@/app/ui/Select/Select";

interface CreateCustomObjectModalProps {
  definition: CustomObjectDefinitionDetail;
  projects: Project[];
  users: User[];
  customObjects: CustomObject[];
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  onUpdate: () => void;
}

const CreateCustomObjectModal: FC<CreateCustomObjectModalProps> = ({
  definition,
  projects,
  users,
  customObjects,
  isOpen,
  onClose,
  onCreate,
}) => {
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {

    }, 500);
  };

  const fields = useMemo(() => {
    return [
      ...definition.fields,
      ...definition.relationships
    ].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }, [definition]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("create_custom_object_modal_title", { name: definition.name })}
      width={640}
    >
      <div className="my-8 flex flex-col gap-3">
        {fields.map((f) => {
          if ("cardinality" in f) {
            const options = getOptions(f);

            if (f.cardinality === CustomRelationshipType.One) {
              return (
                <Select
                  options={

                  }
                />
              )
            }
          }

          return (
            <Input
              placeholder={f.name}
            />
          )
        })}
      </div>
      <Button
        label={t("create")}
        onClick={() => {
          reset();

        }}
      />
    </Modal>
  );
};

export default CreateCustomObjectModal;
