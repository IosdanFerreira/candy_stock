// Nest
import { Injectable } from '@nestjs/common';

// Prisma
import { PrismaService } from 'src/prisma/prisma.service';

// DTO
import { CreateProductDto } from '../dto/create_product.dto';
import { UpdateProductDto } from '../dto/update_product.dto';

// Interfaces
import { IProductRepository } from '../interfaces/product_repository.interface';
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { IProductResponse } from '../interfaces/product_response.interface';

// Utils
import { removeAccents } from 'src/common/utils/remove_accents.utils';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Método que cria os produtos
  async create(createProductDto: CreateProductDto): Promise<IProductResponse> {
    return await this.prisma.product.create({
      data: {
        ...createProductDto,
        name_unaccented: removeAccents(createProductDto.name),
        description_unaccented: removeAccents(createProductDto.description),
      },
      select: {
        id: true,
        name: true,
        name_unaccented: false,
        code: true,
        description: true,
        description_unaccented: false,
        price: true,
        priority_order: true,
        icms: true,
        observations: true,
        deleted: false,
        warehouses: true,
        financial_transactions: true,
        productions: true,
        alerts: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  // Método que busca todos os produtos
  async findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IProductResponse[]> {
    const products: IProductResponse[] = await this.prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { id: orderBy },
      select: {
        id: true,
        name: true,
        name_unaccented: false,
        description: true,
        code: true,
        description_unaccented: false,
        price: true,
        priority_order: true,
        icms: true,
        observations: true,
        deleted: false,
        warehouses: true,
        financial_transactions: true,
        productions: true,
        alerts: true,
        created_at: true,
        updated_at: true,
      },
    });

    return products;
  }

  // Método que busca a quantidade total de produtos sem levar em consideração nenhum tipo de filtro
  async countAll(): Promise<number> {
    const count: number = await this.prisma.product.count();

    return count;
  }

  // Método que busca todos os produtos baseado no termo informado no campo de busca
  async findAllFiltered(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IProductResponse[]> {
    const filteredProducts = await this.prisma.product.findMany({
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
        ],
      },
      skip,
      take: limit,
      orderBy: { id: orderBy },
      select: {
        id: true,
        name: true,
        name_unaccented: false,
        code: true,
        description: true,
        description_unaccented: false,
        price: true,
        priority_order: true,
        icms: true,
        observations: true,
        deleted: false,
        warehouses: true,
        financial_transactions: true,
        productions: true,
        alerts: true,
        created_at: true,
        updated_at: true,
      },
    });

    return filteredProducts;
  }

  // Método que busca a quantidade total de produtos levando em consideração o termo informado no campo de busca
  async countAllFiltered(search: string): Promise<number> {
    const filteredProductsCount: number = await this.prisma.product.count({
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
        ],
      },
    });

    return filteredProductsCount;
  }

  // Método que busca o produto baseado no ID informado
  async findByID(id: number): Promise<IProductResponse> {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        name_unaccented: false,
        code: true,
        description: true,
        description_unaccented: false,
        price: true,
        priority_order: true,
        icms: true,
        observations: true,
        deleted: false,
        warehouses: true,
        financial_transactions: true,
        productions: true,
        alerts: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  // Método que atualiza o produto baseado no ID informado
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<IProductResponse> {
    return await this.prisma.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        name_unaccented: removeAccents(updateProductDto.name),
      },
      select: {
        id: true,
        name: true,
        name_unaccented: false,
        code: true,
        description: true,
        description_unaccented: false,
        price: true,
        priority_order: true,
        icms: true,
        observations: true,
        deleted: false,
        warehouses: true,
        financial_transactions: true,
        productions: true,
        alerts: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  // Método que remove o produto do banco de dados
  async delete(id: number): Promise<IDefaultRepositoryResponse> {
    await this.prisma.product.delete({
      where: { id },
    });

    return {
      message: 'Registo excluído com sucesso!',
      statusCode: 200,
    };
  }
}
