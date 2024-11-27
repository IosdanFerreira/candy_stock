// DTO
import { CreateProductDto } from '../dto/create_product.dto';
import { UpdateProductDto } from '../dto/update_product.dto';

// Interfaces
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { IProductResponse } from './product_response.interface';

export interface IProductRepository {
  create(createProductDto: CreateProductDto): Promise<IProductResponse>;

  findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IProductResponse[]>;

  countAll(): Promise<number>;

  findAllFiltered(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IProductResponse[]>;

  countAllFiltered(search: string): Promise<number>;

  findByID(id: number): Promise<IProductResponse>;

  update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<IProductResponse>;

  delete(id: number): Promise<IDefaultRepositoryResponse>;
}
