// Entity
import { ProductEntity } from '../entities/product.entity';

// DTO
import { CreateProductDto } from '../dto/create_product.dto';
import { UpdateProductDto } from '../dto/update_product.dto';

// Interfaces
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';

export interface IProductRepository {
  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity>;

  getAllProducts(
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

  getProductByID(id: number): Promise<ProductEntity>;

  updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity>;

  deleteProduct(id: number): Promise<IDefaultRepositoryResponse>;
}
