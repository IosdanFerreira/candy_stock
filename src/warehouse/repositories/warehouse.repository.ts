// Nest
import { Injectable } from '@nestjs/common';

// Prisma
import { PrismaService } from 'src/prisma/prisma.service';

// DTO
import { CreateWarehouseDto } from '../dto/create_warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update_warehouse.dto';

// Interfaces
import { IWarehouseRepository } from '../interfaces/warehouse_repository.interface';
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';

// Errors
import { NotFoundError } from 'src/common/errors/types/not-found-error';
import { IWarehouseResponse } from '../interfaces/warehouse_response.interface';
import { removeAccents } from 'src/common/utils/remove_accents.utils';

@Injectable()
export class WarehouseRepository implements IWarehouseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWarehouse(
    createWarehouseDto: CreateWarehouseDto,
  ): Promise<IWarehouseResponse> {
    const warehouse = await this.prisma.warehouse.create({
      data: {
        ...createWarehouseDto,
        name_unaccented: removeAccents(createWarehouseDto.name),
        description_unaccented: removeAccents(createWarehouseDto.description),
      },
      select: {
        id: true,
        acronym: true,
        name: true,
        name_unaccented: true,
        description_unaccented: true,
        description: true,
        register_code: true,
        capacity: true,
        stored: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        deleted: false,
        stored_products: {
          include: {
            product: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });

    return warehouse;
  }

  async getAllWarehouses(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IWarehouseResponse[]> {
    const warehouses = await this.prisma.warehouse.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        acronym: true,
        name: true,
        description: true,
        register_code: true,
        capacity: true,
        stored: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        deleted: false,
        stored_products: {
          include: {
            product: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
      skip,
      take: limit,
      orderBy: { id: orderBy },
    });

    return warehouses;
  }

  async getTotalWarehouseCount(): Promise<number> {
    const count: number = await this.prisma.warehouse.count({
      where: {
        deleted: false,
      },
    });

    return count;
  }

  async getFilteredWarehouses(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IWarehouseResponse[]> {
    const filteredWarehouses: IWarehouseResponse[] =
      await this.prisma.warehouse.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              name_unaccented: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              description_unaccented: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              acronym: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
          AND: { deleted: false },
        },
        select: {
          id: true,
          acronym: true,
          name: true,
          description: true,
          register_code: true,
          capacity: true,
          stored: true,
          cep: true,
          street_name: true,
          house_number: true,
          city_name: true,
          neighborhood: true,
          state: true,
          deleted: false,
          stored_products: {
            include: {
              product: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
        skip,
        take: limit,
        orderBy: { id: orderBy },
      });

    return filteredWarehouses;
  }

  async getFilteredWarehouseCount(search: string): Promise<number> {
    const filteredWarehousesCount = await this.prisma.warehouse.count({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            name_unaccented: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description_unaccented: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            acronym: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
        AND: { deleted: false },
      },
    });

    return filteredWarehousesCount;
  }

  async getWarehouseByID(id: number): Promise<IWarehouseResponse> {
    const warehouse: IWarehouseResponse =
      await this.prisma.warehouse.findUnique({
        where: {
          id,
          deleted: false,
        },
        select: {
          id: true,
          acronym: true,
          name: true,
          description: true,
          register_code: true,
          capacity: true,
          stored: true,
          cep: true,
          street_name: true,
          house_number: true,
          city_name: true,
          neighborhood: true,
          state: true,
          deleted: false,
          stored_products: {
            include: {
              product: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
      });

    if (!warehouse) {
      throw new NotFoundError('Nenhum armazém com esse ID foi encontrado');
    }

    return warehouse;
  }

  async updateWarehouse(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<IWarehouseResponse> {
    const existingWarehouse: IWarehouseResponse =
      await this.prisma.warehouse.findUnique({
        where: {
          id,
          deleted: false,
        },
        select: {
          id: true,
          acronym: true,
          name: true,
          description: true,
          register_code: true,
          capacity: true,
          stored: true,
          cep: true,
          street_name: true,
          house_number: true,
          city_name: true,
          neighborhood: true,
          state: true,
          deleted: false,
          stored_products: {
            include: {
              product: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
      });

    if (!existingWarehouse) {
      throw new NotFoundError('Nenhum armazém com esse ID foi encontrado');
    }

    const updatingWarehouse: IWarehouseResponse =
      await this.prisma.warehouse.update({
        where: {
          id,
          deleted: false,
        },
        data: { ...updateWarehouseDto },
        select: {
          id: true,
          acronym: true,
          name: true,
          description: true,
          register_code: true,
          capacity: true,
          stored: true,
          cep: true,
          street_name: true,
          house_number: true,
          city_name: true,
          neighborhood: true,
          state: true,
          deleted: false,
          stored_products: {
            include: {
              product: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
      });

    return updatingWarehouse;
  }

  async deleteWarehouse(id: number): Promise<IDefaultRepositoryResponse> {
    const existingWarehouse: IWarehouseResponse =
      await this.prisma.warehouse.findUnique({
        where: {
          id,
          deleted: false,
        },
        select: {
          id: true,
          acronym: true,
          name: true,
          description: true,
          register_code: true,
          capacity: true,
          stored: true,
          cep: true,
          street_name: true,
          house_number: true,
          city_name: true,
          neighborhood: true,
          state: true,
          deleted: false,
          stored_products: {
            include: {
              product: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
      });

    if (!existingWarehouse) {
      throw new NotFoundError('Nenhum armazém com esse ID foi encontrado');
    }

    await this.prisma.warehouse.update({
      where: { id },
      data: {
        deleted: true,
      },
    });

    return {
      message: 'Registo excluído com sucesso!',
      statusCode: 200,
    };
  }
}
