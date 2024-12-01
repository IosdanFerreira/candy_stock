import { CreateProductInventoryDto } from '../dto/create_product_inventory.dto';
import { UpdateProductInventoryDto } from '../dto/update_product_inventory.dto';
import { IProductInventoryResponse } from './product_inventory_response';

export interface IProductInventoryRepository {
  create(
    createProductInventoryDto: CreateProductInventoryDto,
  ): Promise<IProductInventoryResponse>;

  findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IProductInventoryResponse[]>;

  countAll(): Promise<number>;

  findAllFiltered(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
    search: string,
  ): Promise<IProductInventoryResponse[]>;

  countAllFiltered(search: string): Promise<number>;

  findByID(id: number): Promise<IProductInventoryResponse>;

  update(
    productInventoryOperationID: number,
    updateProductInventoryDto: UpdateProductInventoryDto,
  ): Promise<IProductInventoryResponse>;
}
