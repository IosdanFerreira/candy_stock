import { Client } from '@prisma/client';

export class ClientEntity implements Client {
  id: number;
  name: string;
  email: string;
  cpf: string;
  cnpj: string;
  state_registration: string;
  registration_date: Date;
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
  created_at: Date;
  updated_at: Date;
}
