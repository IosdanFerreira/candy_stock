import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateSellerDto } from '../dto/create_seller.dto';
import { SellerEntity } from '../entities/seller.entity';
import { UpdateSellerDto } from '../dto/update_seller.dto';

export interface ISellerRepository {
  createSeller(createSellerDto: CreateSellerDto): Promise<SellerEntity>;

  getAllSellers(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<SellerEntity[]>;

  getTotalSellerCount(): Promise<number>;

  getFilteredSellers(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<SellerEntity[]>;

  getFilteredSellerCount(search: string): Promise<number>;

  getSellerByID(id: number): Promise<SellerEntity>;

  updateSeller(
    id: number,
    updateSellerDto: UpdateSellerDto,
  ): Promise<SellerEntity>;

  deleteSeller(id: number): Promise<IDefaultRepositoryResponse>;
}
