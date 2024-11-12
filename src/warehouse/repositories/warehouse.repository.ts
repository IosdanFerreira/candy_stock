// Nest
import { Injectable } from '@nestjs/common';

// Prisma
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

// DTO
import { CreateWarehouseDto } from '../dto/create_warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update_warehouse.dto';

// Entity
import { WarehouseEntity } from '../entities/warehouse.entity';

// Interfaces
import { IWarehouseRepository } from '../interfaces/warehouse_repository.interface';
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';

// Errors
import { NotFoundError } from 'src/common/errors/types/not-found-error';

@Injectable()
export class WarehouseRepository implements IWarehouseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWarehouse(
    createWarehouseDto: CreateWarehouseDto,
  ): Promise<WarehouseEntity> {
    const warehouse = await this.prisma.warehouse.create({
      data: createWarehouseDto,
    });

    return warehouse;
  }

  async getAllWarehouses(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<WarehouseEntity[]> {
    const warehouses: WarehouseEntity[] = await this.prisma.warehouse.findMany({
      skip,
      take: limit,
      orderBy: { id: orderBy },
    });

    return warehouses;
  }

  async getTotalWarehouseCount(): Promise<number> {
    const count: number = await this.prisma.warehouse.count();

    return count;
  }

  async getFilteredWarehouses(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<WarehouseEntity[]> {
    const filteredWarehouses: WarehouseEntity[] = await this.prisma.$queryRaw`
    SELECT * FROM warehouses
    WHERE unaccent("acronym") ILIKE unaccent('%' || ${search} || '%')
      OR unaccent("description") ILIKE unaccent('%' || ${search} || '%')
      ORDER BY "id" ${Prisma.raw(orderBy.toUpperCase())}
      LIMIT ${Prisma.raw(limit.toString())} OFFSET ${Prisma.raw(skip.toString())};
    `;

    return filteredWarehouses;
  }

  async getFilteredWarehouseCount(search: string): Promise<number> {
    const query = await this.prisma.$queryRaw`
    SELECT COUNT(*) as count FROM warehouses
    WHERE unaccent("acronym") ILIKE unaccent('%' || ${search} || '%')
      OR unaccent("description") ILIKE unaccent('%' || ${search} || '%')
    `;

    const filteredWarehousesCount: number = Number(query[0]?.count || 0);

    return filteredWarehousesCount;
  }

  async getWarehouseByID(id: number): Promise<WarehouseEntity> {
    const warehouse: WarehouseEntity = await this.prisma.warehouse.findUnique({
      where: {
        id,
      },
    });

    if (!warehouse) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    return warehouse;
  }

  async updateWarehouse(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<WarehouseEntity> {
    const existingWarehouse: WarehouseEntity =
      await this.prisma.warehouse.findUnique({
        where: {
          id,
        },
      });

    if (!existingWarehouse) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    const updatingWarehouse: WarehouseEntity =
      await this.prisma.warehouse.update({
        where: { id },
        data: { ...updateWarehouseDto },
      });

    return updatingWarehouse;
  }

  async deleteWarehouse(id: number): Promise<IDefaultRepositoryResponse> {
    const existingWarehouse: WarehouseEntity =
      await this.prisma.warehouse.findUnique({
        where: {
          id,
        },
      });

    if (!existingWarehouse) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    await this.prisma.warehouse.delete({
      where: { id },
    });

    return {
      message: 'Registo excluído com sucesso!',
      statusCode: 200,
    };
  }
}
