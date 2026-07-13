"use client";

import { FC, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { errorColor1 } from "@/lib/constants";
import { Button } from "./Button/Button";

interface PaymentMethodFormProps {
  onSuccess: () => void;
}

const PaymentMethodForm: FC<PaymentMethodFormProps> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  console.log("STRIPE KEY", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

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
      <div className={loading ? "pointer-events-none opacity-50" : undefined}>
        <div className="my-6">
          <PaymentElement onChange={(e) => setShowSubmit(e.complete)} />
        </div>
        <div className="mb-6">
          {error && <p style={{ color: errorColor1 }}>{error}</p>}
        </div>
      </div>
      {showSubmit && (
        <Button
          type="submit"
          disabled={!stripe || loading}
          label={loading ? `${t("processing")}...` : t("register")}
        />
      )}
    </form>
  );
};

export default PaymentMethodForm;
