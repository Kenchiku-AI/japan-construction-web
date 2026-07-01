export type BillingPlan = {
  id: string;
  name: string;
  description?: string;
  stripe_price_id: string;
  amount_jpy: number;
  is_hidden: boolean;
  is_default: boolean;
  sort_order: number;
};

export type CreateBillingPlanRequest = {
  name: string;
  description?: string;
  amount_jpy: number;
  stripe_price_id: string;
  is_hidden: boolean;
  is_default: boolean;
  sort_order: number;
};

export type UpdateBillingPlanRequest = CreateBillingPlanRequest;