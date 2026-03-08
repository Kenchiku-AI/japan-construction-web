import { FC, useCallback } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS as DndCSS } from "@dnd-kit/utilities";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import { Plus, Trash } from "@/app/ui/Icons";
import Divider from "@/app/ui/Divider";
import { bgColor1, fontColor2 } from "@/lib/constants";
import styles from "./page.module.css";
import { TextArea } from "@/app/ui/TextArea/TextArea";

interface ReportTemplateFieldsProps {
  fields: ReportTemplateFieldInfo[];
  onChange: (fields: ReportTemplateFieldInfo[]) => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

const ReportTemplateFields: FC<ReportTemplateFieldsProps> = ({
  fields,
  onChange,
  fullWidth,
  disabled,
}) => {
  const { t } = useTranslation();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);

      const newFields = arrayMove(fields, oldIndex, newIndex).map((f, i) => ({
        ...f,
        order: i,
      }));

      onChange(newFields);
    },
    [fields],
  );

  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl self-end">{t("fields")}</div>
        <div style={{ color: fontColor2 }}>{t("drag_to_reorder")}</div>
      </div>
      <Divider style={{ margin: "0" }} />
      <div
        className={`${fullWidth ? "flex flex-col" : "grid grid-cols-1 lg:grid-cols-2"}`}
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((field, index) => (
              <ReportTemplateFieldCell
                key={field.id}
                field={field}
                index={index}
                onChange={(updatedField) => {
                  const newFields = fields.map((f) =>
                    f.id === updatedField.id ? updatedField : f,
                  );
                  onChange(newFields);
                }}
                onRemove={() => {
                  const newFields = fields.filter((f) => f.id !== field.id);
                  onChange(newFields);
                }}
                disabled={disabled}
              />
            ))}
          </SortableContext>
        </DndContext>
        {!disabled && (
          <Button
            variant="tertiary"
            onClick={() => {
              const newField = {
                id: crypto.randomUUID(),
                name: "",
                description: "",
              };
              onChange([...fields, newField]);
            }}
            label={t("add_field")}
            iconLeft={() => <Plus />}
            style={{ height: 60, justifyContent: "center" }}
          />
        )}
      </div>
    </>
  );
};

export type ReportTemplateFieldInfo = {
  id: string;
  name: string;
  description: string;
};

interface ReportTemplateFieldCellProps {
  field: ReportTemplateFieldInfo;
  index: number;
  onChange: (field: ReportTemplateFieldInfo) => void;
  onRemove: () => void;
  disabled?: boolean;
}

const ReportTemplateFieldCell: FC<ReportTemplateFieldCellProps> = ({
  field,
  index,
  onChange,
  onRemove,
  disabled,
}) => {
  const { t } = useTranslation();
  const { name, description } = field;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  return (
    <div
      className="flex flex-col"
      ref={setNodeRef}
      style={{
        transform: DndCSS.Transform.toString(transform),
        cursor: "grab",
        background: "white",
      }}
      {...attributes}
      {...listeners}
    >
      <div className="px-4 mt-3 mb-6">
        <div
          className="flex justify-between"
          style={{ alignItems: "flex-end" }}
        >
          <div className={styles.subtitle}>{`${t("field")} ${index + 1}`}</div>
          {!disabled && (
            <div className="cursor-pointer" onClick={onRemove}>
              <Trash />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <Input
            value={name}
            placeholder={t("name")}
            onChange={(n) => {
              onChange({ ...field, name: n });
            }}
            disabled={disabled}
          />
          <TextArea
            value={description}
            placeholder={t("description")}
            onChange={(d) => {
              onChange({ ...field, description: d });
            }}
            disabled={disabled}
          />
        </div>
      </div>
      <Divider color={fontColor2} style={{ margin: 0 }} />
    </div>
  );
};

export default ReportTemplateFields;
