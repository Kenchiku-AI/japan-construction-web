import { Button } from "@/app/ui/Button/Button";
import { Check, Copy } from "@/app/ui/Icons";
import { buttonColor, fontColor2 } from "@/lib/constants";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface LineLinkCodeButtonProps {
  code: string;
  shorten?: boolean;
  fontSize?: number;
}

const LineLinkCodeButton: FC<LineLinkCodeButtonProps> = ({ code, shorten, fontSize }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {copied ? (
        <div className="flex items-center" style={{ color: fontColor2, height: 40 }}>
          <div className="flex flex-row gap-1 items-center">
            <Check color={fontColor2} />
            {t("copied")}
          </div>
        </div>
      ) : (
        <Button
          variant="tertiary"
          label={shorten ? code : `${t("copy_line_link_code")}: ${code}`}
          iconLeft={() => <Copy color={buttonColor} />}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);

              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 2000);
            } catch (err) {
              console.log("Error copying code:", err);
            }
          }}
          style={{ height: 40 }}
          textStyle={{ fontSize }}
        />
      )}
    </>
  );
}

export default LineLinkCodeButton;