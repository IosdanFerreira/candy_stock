// Entity
import { WarehouseEntity } from '../entities/warehouse.entity';

// DTO
import { CreateWarehouseDto } from '../dto/create_warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update_warehouse.dto';

// Repository
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';

export interface IWarehouseRepository {
  createWarehouse(
    createWarehouseDto: CreateWarehouseDto,
  ): Promise<WarehouseEntity>;

  getAllWarehouses(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<WarehouseEntity[]>;

  getTotalWarehouseCount(): Promise<number>;

  getFilteredWarehouses(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<WarehouseEntity[]>;

  getFilteredWarehouseCount(search: string): Promise<number>;

  getWarehouseByID(id: number): Promise<WarehouseEntity>;

  updateWarehouse(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<WarehouseEntity>;

  deleteWarehouse(id: number): Promise<IDefaultRepositoryResponse>;
}
