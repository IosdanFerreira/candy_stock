// Nest
import { Injectable } from '@nestjs/common';

// DTO
import { CreateWarehouseDto } from './dto/create_warehouse.dto';
import { UpdateWarehouseDto } from './dto/update_warehouse.dto';

// Repository
import { WarehouseRepository } from './repositories/warehouse.repository';

// Utils
import { paginationMeta } from 'src/common/utils/pagination_meta.utils';

@Injectable()
export class WarehouseService {
  constructor(private readonly repository: WarehouseRepository) {}

  create(createWarehouseDto: CreateWarehouseDto) {
    return this.repository.createWarehouse(createWarehouseDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 50,
    orderBy: 'asc' | 'desc' = 'asc',
    search?: string,
  ) {
    const skip = (page - 1) * limit;

    if (search) {
      const filteredWarehousesCount =
        await this.repository.getFilteredWarehouseCount(search);

      const filteredWarehouses = await this.repository.getFilteredWarehouses(
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
    const count = await this.repository.getTotalWarehouseCount();

    const warehouses = await this.repository.getAllWarehouses(
      skip,
      limit,
      orderBy,
    );

    const pagination = paginationMeta(count, page, limit);

    return {
      data: warehouses,
      meta: {
        ...pagination,
      },
    };
  }

  findOne(id: number) {
    return this.repository.getWarehouseByID(id);
  }

  update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return this.repository.updateWarehouse(id, updateWarehouseDto);
  }

  remove(id: number) {
    return this.repository.deleteWarehouse(id);
  }
}
