import { Button } from "@/app/ui/Button/Button";
import { Check, Copy } from "@/app/ui/Icons";
import { buttonColor, fontColor2 } from "@/lib/constants";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface LineWebhookButtonProps {
  companyId: string;
}

const LineWebhookButton: FC<LineWebhookButtonProps> = ({ companyId }) => {
  const [webookCopied, setWebookCopied] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {webookCopied ? (
        <div className="flex items-center" style={{ color: fontColor2, height: 40 }}>
          <div className="flex flex-row gap-1">
            <Check color={fontColor2} />
            {t("copied")}
          </div>
        </div>
      ) : (
        <Button
          variant="tertiary"
          label={t("copy_line_webhook")}
          iconLeft={() => <Copy color={buttonColor} />}
          onClick={async () => {
            try {
              const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/webhooks/line/${companyId}`;
              await navigator.clipboard.writeText(url);

              setWebookCopied(true);

              setTimeout(() => {
                setWebookCopied(false);
              }, 2000);
            } catch (err) {
              console.log("Error copying url:", err);
            }
          }}
          style={{ height: 40 }}
        />
      )}
    </>
  );
}

export default LineWebhookButton;