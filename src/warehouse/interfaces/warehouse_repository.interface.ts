// DTO
import { CreateWarehouseDto } from '../dto/create_warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update_warehouse.dto';

// Interfaces
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { IWarehouseResponse } from './warehouse_response.interface';

export interface IWarehouseRepository {
  create(createWarehouseDto: CreateWarehouseDto): Promise<IWarehouseResponse>;

  findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IWarehouseResponse[]>;

  countAll(): Promise<number>;

  findAllFiltered(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IWarehouseResponse[]>;

  countAllFiltered(search: string): Promise<number>;

  findByID(id: number): Promise<IWarehouseResponse>;

  update(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<IWarehouseResponse>;

  delete(id: number): Promise<IDefaultRepositoryResponse>;

  updateStoredQuantityOnWarehouse(
    warehouseID: number,
    quantityChange: number,
  ): Promise<IWarehouseResponse>;
}
