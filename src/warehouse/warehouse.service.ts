// Nest
import { BadRequestException, Injectable } from '@nestjs/common';

// DTO
import { CreateWarehouseDto } from './dto/create_warehouse.dto';
import { UpdateWarehouseDto } from './dto/update_warehouse.dto';

// Repository
import { WarehouseRepository } from './repositories/warehouse.repository';

// Utils
import { paginationMeta } from 'src/common/utils/pagination_meta.utils';

// Interfaces
import { IWarehouseResponse } from './interfaces/warehouse_response.interface';

// Errors
import { NotFoundError } from 'src/common/errors/types/not-found-error';

@Injectable()
export class WarehouseService {
  constructor(private readonly repository: WarehouseRepository) {}

  async registerWarehouses(createWarehouseDto: CreateWarehouseDto) {
    return await this.repository.create(createWarehouseDto);
  }

  async getAllWarehouses(
    page: number = 1,
    limit: number = 50,
    orderBy: 'asc' | 'desc' = 'asc',
    search?: string,
  ) {
    const skip = (page - 1) * limit;

    if (search) {
      const filteredWarehousesCount =
        await this.repository.countAllFiltered(search);

      const filteredWarehouses = await this.repository.findAllFiltered(
        search,
        skip,
        limit,
        orderBy,
      );

      const filteredPagination = paginationMeta(
        filteredWarehousesCount,
        page,
        limit,
      );

      return {
        data: filteredWarehouses,
        meta: {
          ...filteredPagination,
          search,
        },
      };
    }
    const count = await this.repository.countAll();

    const warehouses = await this.repository.findAll(skip, limit, orderBy);

    const pagination = paginationMeta(count, page, limit);

    return {
      data: warehouses,
      meta: {
        ...pagination,
      },
    };
  }

  async getWarehouseByID(id: number) {
    const warehouse = await this.repository.findByID(id);

    if (!warehouse) {
      throw new NotFoundError('Nenhum armazém com esse ID foi encontrado');
    }

    return warehouse;
  }

  async updateWarehouse(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    await this.getWarehouseByID(id);

    return await this.repository.update(id, updateWarehouseDto);
  }

  async deleteWarehouse(id: number) {
    await this.getWarehouseByID(id);

    return await this.repository.delete(id);
  }

  async checkWarehouseCapacity(
    warehouseID: number,
    quantityToBeStored: number,
  ): Promise<void> {
    const warehouse = await this.getWarehouseByID(warehouseID);

    // verifica a capacidade disponível para armazenamento
    if (warehouse.stored + quantityToBeStored >= warehouse.capacity) {
      throw new BadRequestException('A capacidade do armazém foi excedida');
    }
  }

  async updateStoredQuantityOnWarehouse(
    warehouseID: number,
    quantityChange: number,
  ): Promise<IWarehouseResponse> {
    await this.getWarehouseByID(warehouseID);

    return await this.repository.updateStoredQuantityOnWarehouse(
      warehouseID,
      quantityChange,
    );
  }
}
