export type CatalogItem = {
  id: string;
  company_id: string;
  code: string;
  name: string;
  name_kana: string;
  unit?: string;
  supplier_code?: string;
  supplier_name?: string;
  list_price?: number;
  unit_cost?: number;
  source_updated_at?: string;
  created_at: string;
  updated_at: string;
}

export type CreateCatalogItemRequest = {
  company_id: string;
  code: string;
  name: string;
  name_kana?: string;
  unit?: string;
  supplier_code?: string;
  supplier_name?: string;
  list_price?: number;
  unit_cost?: number;
  source_updated_at?: string;
}

export type UpdateCatalogItemRequest = {
  code: string;
  name: string;
  name_kana: string;
  unit?: string;
  supplier_code?: string;
  supplier_name?: string;
  list_price?: number;
  unit_cost?: number;
  source_updated_at?: string;
}