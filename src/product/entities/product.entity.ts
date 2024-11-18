import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: number;
  name: string;
  code: number;
  description: string | null;
  price: number;
  priority_order: number;
  icms: boolean;
  observations: string | null;
  active_status: boolean;
  created_at: Date;
  updated_at: Date;
}
