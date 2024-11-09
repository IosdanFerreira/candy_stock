import { CreateProductDto } from '../dto/create_product.dto';
import { ProductEntity } from '../entities/product.entity';

export interface IProductRepository {
  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity>;

  findAllProducts(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ProductEntity[]>;

  getTotalProductCount(): Promise<number>;

  getFilteredProducts(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ProductEntity[]>;

  getFilteredProductCount(search: string): Promise<number>;
}
