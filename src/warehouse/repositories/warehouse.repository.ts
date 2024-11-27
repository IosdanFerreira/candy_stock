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
import { IWarehouseResponse } from '../interfaces/warehouse_response.interface';

// Utils
import { removeAccents } from 'src/common/utils/remove_accents.utils';

@Injectable()
export class WarehouseRepository implements IWarehouseRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Gera um código de registro aleatório único
  private generateRegisterCode(): string {
    const currentDay = new Date().getTime().toString();
    const randomCode = Math.floor(1000000000 + Math.random() * 9000000000);

    const registerCode = `WH${currentDay}${randomCode}`;
    return registerCode;
  }

  async create(
    createWarehouseDto: CreateWarehouseDto,
  ): Promise<IWarehouseResponse> {
    return await this.prisma.warehouse.create({
      data: {
        ...createWarehouseDto,
        name_unaccented: removeAccents(createWarehouseDto.name),
        description_unaccented: removeAccents(createWarehouseDto.description),
        register_code: this.generateRegisterCode(),
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
          where: {
            quantity: {
              gt: 0,
            },
          },
          select: {
            product: true,
            quantity: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IWarehouseResponse[]> {
    return await this.prisma.warehouse.findMany({
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
          where: {
            quantity: {
              gt: 0,
            },
          },
          select: {
            product: true,
            quantity: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
      skip,
      take: limit,
      orderBy: { id: orderBy },
    });
  }

  async countAll(): Promise<number> {
    return await this.prisma.warehouse.count({
      where: {
        deleted: false,
      },
    });
  }

  async findAllFiltered(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IWarehouseResponse[]> {
    return await this.prisma.warehouse.findMany({
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
          where: {
            quantity: {
              gt: 0,
            },
          },
          select: {
            product: true,
            quantity: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
      skip,
      take: limit,
      orderBy: { id: orderBy },
    });
  }

  async countAllFiltered(search: string): Promise<number> {
    return await this.prisma.warehouse.count({
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
  }

  async findByID(id: number): Promise<IWarehouseResponse> {
    return await this.prisma.warehouse.findUnique({
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
          where: {
            quantity: {
              gt: 0,
            },
          },
          select: {
            product: true,
            quantity: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
  }

  async update(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<IWarehouseResponse> {
    return await this.prisma.warehouse.update({
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
          where: {
            quantity: {
              gt: 0,
            },
          },
          select: {
            product: true,
            quantity: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
  }

  async delete(id: number): Promise<IDefaultRepositoryResponse> {
    await this.prisma.warehouse.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });

    return {
      message: 'Registo excluído com sucesso!',
      statusCode: 200,
    };
  }

  async updateStoredQuantityOnWarehouse(
    warehouseID: number,
    quantityChange: number,
  ) {
    return await this.prisma.warehouse.update({
      where: {
        id: warehouseID,
        AND: {
          deleted: false,
        },
      },
      data: { stored: { increment: quantityChange } },
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
          where: {
            quantity: {
              gt: 0,
            },
          },
          select: {
            product: true,
            quantity: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
  }
}
