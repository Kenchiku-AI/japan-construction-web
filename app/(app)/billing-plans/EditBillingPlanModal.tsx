import { FC, useEffect, useState } from "react";
import { Button } from "@/app/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Input } from "@/app/ui/Input/Input";
import Modal from "@/app/ui/Modal";
import { BillingPlan, UpdateBillingPlanRequest } from "@/types/billingPlans";

interface EditBillingPlanModalProps {
  isOpen: boolean;
  billingPlan?: BillingPlan;
  onClose: () => void;
  onSubmit: (request: UpdateBillingPlanRequest) => void;
}

const EditBillingPlanModal: FC<EditBillingPlanModalProps> = ({
  isOpen,
  billingPlan,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState(billingPlan?.name ?? "");
  const [description, setDescription] = useState(billingPlan?.description ?? "");
  const [yen, setYen] = useState(`${billingPlan?.amount_jpy ?? ""}`);
  const [stripePriceId, setStripePriceId] = useState(billingPlan?.stripe_price_id ?? "");
  const [sortOrder, setSortOrder] = useState(`${billingPlan?.sort_order ?? ""}`);
  const [isHidden, setIsHidden] = useState(billingPlan?.is_hidden ?? false);
  const [isDefault, setIsDefault] = useState(billingPlan?.is_default ?? false);
  const { t } = useTranslation();

  const reset = () => {
    setTimeout(() => {
      setName("");
      setDescription("");
      setYen("");
      setStripePriceId("");
      setSortOrder("");
      setIsHidden(false);
      setIsDefault(false);
    }, 500);
  };

  useEffect(() => {
    if (isOpen && billingPlan) {
      setName(billingPlan.name);
      setDescription(billingPlan.description ?? "");
      setYen(`${billingPlan.amount_jpy}`);
      setStripePriceId(billingPlan.stripe_price_id);
      setSortOrder(`${billingPlan.sort_order}`);
      setIsHidden(billingPlan.is_hidden);
      setIsDefault(billingPlan.is_default);
    }
  }, [isOpen]);

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
        <Input value={sortOrder} placeholder={t("sort_order")} type="number" onChange={setSortOrder} />
        <div className="flex items-center justify-between gap-4 pt-3">
          <div>{t("hidden")}</div>
          <input
            type="checkbox"
            className="toggle toggle-md"
            checked={isHidden}
            onChange={(e) => setIsHidden(e.target.checked)}
          />
        </div>
        <div className="flex items-center justify-between gap-4 pt-3">
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

export default EditBillingPlanModal;
