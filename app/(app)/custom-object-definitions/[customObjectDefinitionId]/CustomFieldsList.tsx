import { FC, useCallback } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS as DndCSS } from "@dnd-kit/utilities";
import { Edit, Plus, Trash } from "@/app/ui/Icons";
import { bgColor5, cardClass, fontColor1 } from "@/lib/constants";
import styles from "./page.module.css";
import { CustomFieldDefinition, CustomRelationshipDefinition } from "@/types";

type CustomFieldListItem = CustomFieldDefinition | CustomRelationshipDefinition;

interface CustomFieldsListProps {
  items: CustomFieldListItem[];
  onChangeOrder: (items: CustomFieldListItem[]) => void;
  onEdit: (item: CustomFieldListItem) => void;
  onDelete: (item: CustomFieldListItem) => void;
  hideCard?: boolean;
}

const CustomFieldsList: FC<CustomFieldsListProps> = ({
  items,
  onChangeOrder,
  onEdit,
  onDelete,
  hideCard
}) => {
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex).map((item, i) => ({
        ...item,
        order: i,
      }));

      onChangeOrder(newItems);
    },
    [items],
  );

  return (
    <>
      <div className={hideCard ? "mt-3" : cardClass}>
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
      </div>
    </>
  );
};

interface CustomFieldListCellProps {
  item: CustomFieldListItem;
  onEdit: () => void;
  onDelete: () => void;
}

const CustomFieldListCell: FC<CustomFieldListCellProps> = ({
  item,
  onEdit,
  onDelete
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: item.id,
    });

  return (
    <div>
      <div
        ref={setNodeRef}
        style={{
          position: "relative",
          transform: DndCSS.Transform.toString(transform),
          background: "white",
          padding: "0 16px",
          borderColor: bgColor5
        }}
        className={`border rounded-xl ${isDragging ? "shadow z-500" : ""}`}
      >
        <div>
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing md:mx-3"
          >
            <div className="flex items-center justify-between gap-5">
              <div
                style={{ minHeight: 60, minWidth: 0 }}
                className="flex items-center gap-3"
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: fontColor1 }}>{item.name}</div>
                  <div className={styles.subtitle}>{item.description}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center">
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
