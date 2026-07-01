import { FC, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { CreateBillingPlanRequest } from "@/types/billingPlans";

interface CreateBillingPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: CreateBillingPlanRequest) => void;
}

const CreateBillingPlanModal: FC<CreateBillingPlanModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [yen, setYen] = useState("0");
  const [stripePriceId, setStripePriceId] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isHidden, setIsHidden] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setDescription("");
      setYen("0");
      setStripePriceId("");
      setSortOrder("0");
      setIsHidden(false);
      setIsDefault(false);
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={t("create_billing_plan")}
    >
      <div className="my-8 flex flex-col gap-3">
        <Input value={name} placeholder={t("name")} onChange={setName} />
        <Input value={description} placeholder={t("description")} onChange={setDescription} />
        <Input value={yen} placeholder={t("amount_yen")} type="number" onChange={setYen} />
        <Input value={stripePriceId} placeholder={t("stripe_price_id")} onChange={setStripePriceId} />
        <div>
          <div>{t("hidden")}</div>
          <input
            type="checkbox"
            className="toggle toggle-md"
            checked={isHidden}
            onChange={(e) => setIsHidden(e.target.checked)}
          />
        </div>
        <div>
          <div>{t("default")}</div>
          <input
            type="checkbox"
            className="toggle toggle-md"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
          />
        </div>
      </div>
      <Button
        disabled={!name || !yen || !stripePriceId}
        label={t("create")}
        onClick={() => {
          onSubmit({
            name,
            description,
            amount_jpy: +yen,
            stripe_price_id: stripePriceId,
            sort_order: +sortOrder,
            is_default: isDefault,
            is_hidden: isHidden
          });

          reset();
        }}
      />
    </Modal>
  );
};

export default CreateBillingPlanModal;
