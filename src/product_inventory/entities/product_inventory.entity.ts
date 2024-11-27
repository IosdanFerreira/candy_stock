import { WarehouseProduct } from '@prisma/client';

export class ProductInventory implements WarehouseProduct {
  id: number;
  warehouse_id: number;
  product_id: number;
  quantity: number;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
