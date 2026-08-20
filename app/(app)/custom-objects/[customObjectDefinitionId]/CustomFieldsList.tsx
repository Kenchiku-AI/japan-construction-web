import { FC, useCallback, useMemo } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS as DndCSS } from "@dnd-kit/utilities";
import { Edit, Trash } from "@/app/ui/Icons";
import { bgColor5, fontColor1 } from "@/lib/constants";
import styles from "./page.module.css";
import { CustomFieldDataType, CustomFieldEntityType, CustomFieldListItem, CustomObjectDefinition } from "@/types";
import { useTranslation } from "react-i18next";

interface CustomFieldsListProps {
  items: CustomFieldListItem[];
  isEmpty: boolean;
  customObjects: CustomObjectDefinition[];
  onChangeOrder: (items: CustomFieldListItem[]) => void;
  onEdit: (item: CustomFieldListItem) => void;
  onDelete: (item: CustomFieldListItem) => void;
  hideCard?: boolean;
}

const CustomFieldsList: FC<CustomFieldsListProps> = ({
  items,
  isEmpty,
  customObjects,
  onChangeOrder,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex).map((item, i) => ({
        ...item,
        sort_order: i,
      }));

      onChangeOrder(newItems);
    },
    [items],
  );

  if (isEmpty) {
    return (
      <div className={styles.empty}>
        {t("empty_custom_fields_description")}
      </div>
    );
  }

  return (
    <div className={"flex flex-col gap-3"}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <CustomFieldListCell
              key={item.id}
              item={item}
              customObjects={customObjects}
              onEdit={() => {
                onEdit(item);
              }}
              onDelete={() => {
                onDelete(item);
              }}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

interface CustomFieldListCellProps {
  item: CustomFieldListItem;
  customObjects: CustomObjectDefinition[];
  onEdit: () => void;
  onDelete: () => void;
}

const CustomFieldListCell: FC<CustomFieldListCellProps> = ({
  item,
  customObjects,
  onEdit,
  onDelete
}) => {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: item.id,
    });

  const fieldTypeLabel = useMemo(() => {
    if ("target_entity_type" in item) {
      if (item.target_entity_type !== CustomFieldEntityType.CustomObject) {
        return t(item.target_entity_type);
      }

      const object = customObjects.find((o) => o.id === item.target_entity_type);
      return object?.name ?? "";
    }

    if (item.data_type === CustomFieldDataType.Text) {
      return t("text");
    }

    if (item.data_type === CustomFieldDataType.Boolean) {
      return t("checkbox");
    }

    return "";
  }, [item, customObjects])

  return (
    <div>
      <div
        ref={setNodeRef}
        style={{
          position: "relative",
          transform: DndCSS.Transform.toString(transform),
          background: "white",
          borderColor: bgColor5
        }}
        className={`border rounded-xl ${isDragging ? "shadow z-500" : ""}`}
      >
        <div className="flex">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing md:mx-3 px-3 py-2 flex-1"
          >
            <div className="flex items-center justify-between">
              <div
                style={{ minHeight: 60, minWidth: 0 }}
                className="flex items-center gap-3"
              >
                <div style={{ minWidth: 0 }}>
                  <div className="flex items-center gap-3">
                    <div style={{ color: fontColor1 }}>{item.name}</div>
                    {fieldTypeLabel && (
                      <>
                        <div className={styles.subtitle}>•</div>
                        <div className={styles.subtitle}>{fieldTypeLabel}</div>
                      </>
                    )}
                  </div>
                  <div className={styles.subtitle}>{item.description}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex gap-4 items-center"
            style={{ paddingRight: 20 }}
          >
            <div
              className="cursor-pointer pb-1"
              onClick={onEdit}
            >
              <Edit />
            </div>
            <div className="cursor-pointer" onClick={onDelete}>
              <Trash />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFieldsList;
