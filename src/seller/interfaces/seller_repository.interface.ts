import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateSellerDto } from '../dto/create_seller.dto';
import { UpdateSellerDto } from '../dto/update_seller.dto';
import { ISellerResponse } from './seller_response.interface';

export interface ISellerRepository {
  create(createSellerDto: CreateSellerDto): Promise<ISellerResponse>;

  findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ISellerResponse[]>;

  countAll(): Promise<number>;

  findAllFiltered(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ISellerResponse[]>;

  countAllFiltered(search: string): Promise<number>;

  findByID(id: number): Promise<ISellerResponse>;

  update(
    id: number,
    updateSellerDto: UpdateSellerDto,
  ): Promise<ISellerResponse>;

  delete(id: number): Promise<IDefaultRepositoryResponse>;
}
