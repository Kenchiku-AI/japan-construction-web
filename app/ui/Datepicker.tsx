import { FC } from "react";
import { DayPicker } from "react-day-picker";
import { useTranslation } from "react-i18next";

interface DatepickerProps {
  date?: Date;
  onSelect: (date?: Date) => void;
}

export const Datepicker: FC<DatepickerProps> = ({ date, onSelect }) => {
  const { t } = useTranslation();

  return (
    <>
      <button
        popoverTarget="rdp-popover"
        className="input input-border"
        style={{ anchorName: "--rdp" } as React.CSSProperties}
      >
        {date ? date.toLocaleDateString() : t("date")}
      </button>
      <div
        popover="auto"
        id="rdp-popover"
        className="dropdown"
        style={{ positionAnchor: "--rdp" } as React.CSSProperties}
      >
        <DayPicker
          className="react-day-picker"
          mode="single"
          selected={date}
          onSelect={onSelect}
        />
      </div>
    </>
  );
};
