import { ProductEntity } from 'src/product/entities/product.entity';
import { WarehouseEntity } from 'src/warehouse/entities/warehouse.entity';

export interface IProductInventoryResponse {
  id: number;
  product_id: number;
  warehouse_id: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  warehouse: WarehouseEntity;
  product: ProductEntity;
}
