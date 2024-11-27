export interface IClientResponse {
  id: number;
  name: string;
  email: string;
  cpf: string;
  cnpj: string;
  registration_date: string;
  birth_date: string;
  cep: string;
  street_name: string;
  house_number: number;
  city_name: string;
  neighborhood: string;
  state: string;
  phone_1: string;
  phone_2: string;
  whatsapp: string;
  observation: string;
  FinancialTransaction: any[];
  created_at: Date;
  updated_at: Date;
}
