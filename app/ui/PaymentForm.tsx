"use client";

import { FC, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { errorColor1 } from "@/lib/constants";

interface PaymentMethodFormProps {
  onSuccess: () => void;
}

const PaymentMethodForm: FC<PaymentMethodFormProps> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmSetup({
      elements,
      redirect: "if_required", // only redirect for 3DS when actually needed
    });

    if (confirmError) {
      setError(confirmError.message ?? t("error_description"));
      setLoading(false);
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p style={{ color: errorColor1 }}>{error}</p>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? `${t("processing")}...` : t("register")}
      </button>
    </form>
  );
};

export default PaymentMethodForm;
