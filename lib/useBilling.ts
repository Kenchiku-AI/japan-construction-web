import axios, { AxiosError } from "axios";
import { useModal } from "./modal/ModalContext";

export const useBilling = () => {
  const { showModal } = useModal();

  const isBillingError = (err: any) => {
    if (!axios.isAxiosError(err)) return false;
    if (err.response?.status !== 402) return false;

    const detail = err.response.data?.detail;
    return handleBillingReason(detail);
  }

  const handleBillingReason = (reason: string) => {
    const reasons = [
      "payment_method_required", 
      "subscription_past_due"
    ];

    if (reasons.includes(reason)) {
      showModal({
        title: reason,
        subtitle: `${reason}_description`
      });
      return true;
    }

    return false;
  }

  return {
    isBillingError,
  };
};
