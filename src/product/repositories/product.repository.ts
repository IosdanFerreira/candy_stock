// repositories/product.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from '../dto/create_product.dto';
import { ProductEntity } from '../entities/product.entity';
import { IProductRepository } from '../interfaces/product.repository.interface';

import { filterDatabaseRecords } from 'src/common/utils/filter_database_record.utils';
import { filterDatabaseRecordsCount } from 'src/common/utils/filter_database_record_count.utils';
import { NotFoundError } from 'src/common/errors/types/not-found-error';
import { UpdateProductDto } from '../dto/update_product.dto';
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';

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
  async findAllProducts(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ProductEntity[]> {
    const products: ProductEntity[] = await this.prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { id: orderBy },
    });

    return products;
  }

  // Método que busca a quantidade total de produtos sem levar em consideração nenhum tipo de filtro
  async getTotalProductCount(): Promise<number> {
    const count: number = await this.prisma.product.count();

    return count;
  }

  // Método que busca todos os produtos baseado no termo informado no campo de busca
  async getFilteredProducts(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ProductEntity[]> {
    const filteredProducts: ProductEntity[] = await filterDatabaseRecords({
      prismaClient: this.prisma,
      databaseTableName: 'products',
      searchTerm: search,
      limit,
      skip,
      orderBy,
    });

    return filteredProducts;
  }

  // Método que busca a quantidade total de produtos levando em consideração o termo informado no campo de busca
  async getFilteredProductCount(search: string): Promise<number> {
    const filteredProductsCount: number = await filterDatabaseRecordsCount({
      prismaClient: this.prisma,
      databaseTableName: 'products',
      searchTerm: search,
    });

    return filteredProductsCount;
  }

  // Método que busca o produto baseado no ID informado
  async findProductByID(id: number): Promise<ProductEntity> {
    const product: ProductEntity = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    return product;
  }

  // Método que atualiza o produto baseado no ID informado
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const existingProduct: ProductEntity = await this.prisma.product.findUnique(
      {
        where: {
          id,
        },
      },
    );

    if (!existingProduct) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    const updatingProduct: ProductEntity = await this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto },
    });

    return updatingProduct;
  }

  // Método que remove o produto do banco de dados
  async removeProduct(id: number): Promise<IDefaultRepositoryResponse> {
    const existingProduct: ProductEntity = await this.prisma.product.findUnique(
      {
        where: {
          id,
        },
      },
    );

    if (!existingProduct) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return {
      message: 'Registo excluído com sucesso!',
      statusCode: 200,
    };
  }
}
