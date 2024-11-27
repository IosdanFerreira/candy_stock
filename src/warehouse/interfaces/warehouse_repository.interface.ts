// DTO
import { CreateWarehouseDto } from '../dto/create_warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update_warehouse.dto';

// Interfaces
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { IWarehouseResponse } from './warehouse_response.interface';

export interface IWarehouseRepository {
  createWarehouse(
    createWarehouseDto: CreateWarehouseDto,
  ): Promise<IWarehouseResponse>;

  getAllWarehouses(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IWarehouseResponse[]>;

  getTotalWarehouseCount(): Promise<number>;

  getFilteredWarehouses(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IWarehouseResponse[]>;

  getFilteredWarehouseCount(search: string): Promise<number>;

  getWarehouseByID(id: number): Promise<IWarehouseResponse>;

  updateWarehouse(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<IWarehouseResponse>;

  deleteWarehouse(id: number): Promise<IDefaultRepositoryResponse>;

  updateStoredQuantityOnWarehouse(
    warehouseID: number,
    quantityChange: number,
  ): Promise<IWarehouseResponse>;
}
