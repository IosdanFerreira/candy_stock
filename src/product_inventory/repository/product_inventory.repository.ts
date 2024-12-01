import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProductInventoryRepository } from '../interfaces/product_inventory_repository.interface';
import { CreateProductInventoryDto } from '../dto/create_product_inventory.dto';
import { IProductInventoryResponse } from '../interfaces/product_inventory_response';
import { UpdateProductInventoryDto } from '../dto/update_product_inventory.dto';

@Injectable()
export class ProductInventoryRepository implements IProductInventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createProductInventoryDto: CreateProductInventoryDto,
  ): Promise<IProductInventoryResponse> {
    return await this.prisma.warehouseProduct.create({
      data: createProductInventoryDto,
      select: {
        id: true,
        product_id: true,
        warehouse_id: true,
        quantity: true,
        created_at: true,
        updated_at: true,
        warehouse: true,
        product: true,
      },
    });
  }

  async findAll(skip: number, limit: number, orderBy: 'asc' | 'desc') {
    return await this.prisma.warehouseProduct.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        product_id: true,
        warehouse_id: true,
        quantity: true,
        created_at: true,
        updated_at: true,
        warehouse: true,
        product: true,
      },
      skip,
      take: limit,
      orderBy: {
        id: orderBy,
      },
    });
  }

  async countAll() {
    return await this.prisma.warehouseProduct.count({
      where: {
        deleted: false,
      },
    });
  }

  async findAllFiltered(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
    search: string,
  ): Promise<IProductInventoryResponse[]> {
    return await this.prisma.warehouseProduct.findMany({
      where: {
        OR: [
          {
            warehouse: {
              OR: [
                {
                  acronym: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
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
              ],
            },
          },
          {
            product: {
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
              ],
            },
          },
        ],
        AND: {
          deleted: false,
        },
      },
      select: {
        id: true,
        product_id: true,
        warehouse_id: true,
        quantity: true,
        created_at: true,
        updated_at: true,
        warehouse: true,
        product: true,
      },
      skip,
      take: limit,
      orderBy: {
        id: orderBy,
      },
    });
  }

  async countAllFiltered(search: string): Promise<number> {
    return await this.prisma.warehouseProduct.count({
      where: {
        OR: [
          {
            warehouse: {
              OR: [
                {
                  acronym: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
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
              ],
            },
          },
          {
            product: {
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
              ],
            },
          },
        ],
        AND: {
          deleted: false,
        },
      },
    });
  }

  async findByID(id: number): Promise<IProductInventoryResponse> {
    return await this.prisma.warehouseProduct.findUnique({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        product_id: true,
        warehouse_id: true,
        quantity: true,
        created_at: true,
        updated_at: true,
        warehouse: true,
        product: true,
      },
    });
  }

  async update(
    productInventoryOperationID: number,
    updateProductInventoryDto: UpdateProductInventoryDto,
  ) {
    return await this.prisma.warehouseProduct.update({
      where: {
        id: productInventoryOperationID,
        deleted: false,
      },
      data: updateProductInventoryDto,
      select: {
        id: true,
        product_id: true,
        warehouse_id: true,
        quantity: true,
        created_at: true,
        updated_at: true,
        warehouse: true,
        product: true,
      },
    });
  }

  async delete(productInventoryOperationID: number) {
    await this.prisma.warehouseProduct.update({
      where: {
        id: productInventoryOperationID,
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
}
