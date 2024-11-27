import { CreateProductInventoryDto } from '../dto/create_product_inventory.dto';
import { ProductInventory } from '../entities/product_inventory.entity';

export interface IProductInventoryRepository {
  addProductToWarehouse(
    createProductInventoryDto: CreateProductInventoryDto,
  ): Promise<ProductInventory>;
}
