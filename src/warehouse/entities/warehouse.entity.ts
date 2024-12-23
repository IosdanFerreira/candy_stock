import { Warehouse } from '@prisma/client';

export class WarehouseEntity implements Warehouse {
  id: number;
  acronym: string;
  name: string;
  name_unaccented: string;
  description: string;
  description_unaccented: string;
  register_code: string;
  capacity: number;
  stored: number;
  cep: string;
  street_name: string;
  house_number: number;
  city_name: string;
  neighborhood: string;
  state: string;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
