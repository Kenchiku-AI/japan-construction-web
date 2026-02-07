import { bgColor2, errorColor2 } from "@/lib/constants";
import { FC } from "react";
import { DayPicker } from "react-day-picker";
import { useTranslation } from "react-i18next";

interface DatepickerProps {
  date?: Date;
  onSelect: (date?: Date) => void;
  error?: boolean;
}

export const Datepicker: FC<DatepickerProps> = ({ date, onSelect, error }) => {
  const { t } = useTranslation();

  return (
    <>
      <button
        popoverTarget="rdp-popover"
        className="input input-border"
        style={{
          anchorName: "--rdp",
          backgroundColor: error ? errorColor2 : bgColor2,
        }}
      >
        {date ? date.toLocaleDateString() : t("date")}
      </button>
      <div
        popover="auto"
        id="rdp-popover"
        className="dropdown"
        style={{ positionAnchor: "--rdp" }}
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
