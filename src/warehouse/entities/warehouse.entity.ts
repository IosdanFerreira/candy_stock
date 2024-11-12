import { Warehouse } from '@prisma/client';

export class WarehouseEntity implements Warehouse {
  id: number;
  acronym: string;
  description: string;
  registration_date: Date;
  capacity: number;
  stored: number;
  created_at: Date;
  updated_at: Date;
}
