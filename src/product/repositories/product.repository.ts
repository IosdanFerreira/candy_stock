// repositories/product.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from '../dto/create_product.dto';
import { ProductEntity } from '../entities/product.entity';
import { IProductRepository } from '../interfaces/product.repository.interface';

import { filterDatabaseRecords } from 'src/common/utils/filter_database_record.utils';
import { filterDatabaseRecordsCount } from 'src/common/utils/filter_database_record_count.utils';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Método que cria os produtos
  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.prisma.product.create({ data: createProductDto });
  }

  // Método que busca todos os produtos
  async findAllProducts(skip: number, limit: number, orderBy: 'asc' | 'desc') {
    const products = await this.prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { id: orderBy },
    });

    return products;
  }

  async getTotalProductCount(): Promise<number> {
    return this.prisma.product.count();
  }

  async getFilteredProducts(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ProductEntity[]> {
    return filterDatabaseRecords({
      prismaClient: this.prisma,
      databaseTableName: 'products',
      searchTerm: search,
      limit,
      skip,
      orderBy,
    });
  }

  async getFilteredProductCount(search: string): Promise<number> {
    return filterDatabaseRecordsCount({
      prismaClient: this.prisma,
      databaseTableName: 'products',
      searchTerm: search,
    });
  }
}
