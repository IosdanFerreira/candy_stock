// Nest
import { Injectable } from '@nestjs/common';

// Prisma
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

// Entity
import { ProductEntity } from '../entities/product.entity';

// DTO
import { CreateProductDto } from '../dto/create_product.dto';
import { UpdateProductDto } from '../dto/update_product.dto';

// Interfaces
import { IProductRepository } from '../interfaces/product_repository.interface';
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';

// Errors
import { NotFoundError } from 'src/common/errors/types/not-found-error';

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
  async getAllProducts(
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
    const filteredProducts: ProductEntity[] = await this.prisma.$queryRaw`
    SELECT * FROM products
    WHERE unaccent("name") ILIKE unaccent('%' || ${search} || '%')
      OR unaccent("description") ILIKE unaccent('%' || ${search} || '%')
    ORDER BY "id" ${Prisma.raw(orderBy.toUpperCase())}
    LIMIT ${Prisma.raw(limit.toString())} OFFSET ${Prisma.raw(skip.toString())};
    `;

    return filteredProducts;
  }

  // Método que busca a quantidade total de produtos levando em consideração o termo informado no campo de busca
  async getFilteredProductCount(search: string): Promise<number> {
    const query = await this.prisma.$queryRaw`
    SELECT COUNT(*) as count FROM products
    WHERE unaccent("name") ILIKE unaccent('%' || ${search} || '%')
      OR unaccent("description") ILIKE unaccent('%' || ${search} || '%')
    `;

    const filteredProductsCount: number = Number(query[0]?.count || 0);

    return filteredProductsCount;
  }

  // Método que busca o produto baseado no ID informado
  async getProductByID(id: number): Promise<ProductEntity> {
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
  async deleteProduct(id: number): Promise<IDefaultRepositoryResponse> {
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
