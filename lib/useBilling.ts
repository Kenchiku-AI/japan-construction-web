import axios, { AxiosError } from "axios";
import { useModal } from "./modal/ModalContext";

export const useBilling = () => {
  const { showModal } = useModal();

  const handleBillingError = (err: any) => {
    if (!axios.isAxiosError(err)) return;
    
  }

  return {
    handleBillingError,
  };
};
