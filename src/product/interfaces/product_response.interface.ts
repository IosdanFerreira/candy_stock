export interface IProductResponse {
  id: number;
  name: string;
  description: string;
  code: number;
  price: number;
  priority_order: number;
  icms: boolean;
  observations: string;
  warehouses: any[];
  financial_transactions: any[];
  productions: any[];
  alerts: any[];
  created_at: Date;
  updated_at: Date;
}
