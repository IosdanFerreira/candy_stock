import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: number;
  name: string;
  name_unaccented: string;
  code: number;
  description: string | null;
  description_unaccented: string;
  price: number;
  priority_order: number;
  icms: boolean;
  observations: string | null;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
