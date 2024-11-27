export interface ISellerResponse {
  id: number;
  name: string;
  admission_date: string;
  cpf: string;
  birth_date: string;
  cep: string;
  street_name: string;
  house_number: number;
  city_name: string;
  neighborhood: string;
  state: string;
  phone_1: string;
  phone_2: string;
  observation: string;
  dismissal_date: string;
  financial_transactions: any[];
  created_at: Date;
  updated_at: Date;
}
