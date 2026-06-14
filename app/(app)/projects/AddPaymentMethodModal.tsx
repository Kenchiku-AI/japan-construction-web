import { Elements } from "@stripe/react-stripe-js";
import { FC } from "react";
import { getStripe } from "@/lib/stripe";
import PaymentMethodForm from "@/app/ui/PaymentForm";
import Modal from "@/app/ui/Modal";
import { useTranslation } from "react-i18next";

interface AddPaymentMethodModal {
  clientSecret: string;
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const AddPaymentMethodModal: FC<AddPaymentMethodModal> = ({
  clientSecret,
  isOpen,
  onSuccess,
  onClose,
}) => {
  const { t } = useTranslation();

  return !clientSecret ? null : (
    <Modal
      isOpen={isOpen}
      title={t("add_payment_method")}
      subtitle={t("add_payment_method_description")}
      onClose={onClose}
    >
      <Elements stripe={getStripe()} options={{ clientSecret }}>
        <PaymentMethodForm onSuccess={onSuccess} />
      </Elements>
    </Modal>
  );
};

export default AddPaymentMethodModal;
