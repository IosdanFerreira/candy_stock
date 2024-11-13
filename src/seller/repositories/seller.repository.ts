import { Injectable } from '@nestjs/common';
import { ISellerRepository } from '../interfaces/seller_repository.interface';
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateSellerDto } from '../dto/create_seller.dto';
import { UpdateSellerDto } from '../dto/update_seller.dto';
import { SellerEntity } from '../entities/seller.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/common/errors/types/not-found-error';

@Injectable()
export class SellerRepository implements ISellerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSeller(createSellerDto: CreateSellerDto): Promise<SellerEntity> {
    const seller = await this.prisma.seller.create({
      data: createSellerDto,
    });

    return seller;
  }

  async getAllSellers(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<SellerEntity[]> {
    const allSellers = await this.prisma.seller.findMany({
      skip,
      take: limit,
      orderBy: { id: orderBy },
    });

    return allSellers;
  }

  async getTotalSellerCount(): Promise<number> {
    const count = await this.prisma.seller.count();

    return count;
  }

  async getFilteredSellers(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<SellerEntity[]> {
    const allFilteredSellers: SellerEntity[] = await this.prisma.$queryRaw`
    SELECT * FROM sellers
    WHERE unaccent("name") ILIKE unaccent('%' || ${search} || '%')
      OR unaccent("cpf") ILIKE unaccent('%' || ${search} || '%')
    ORDER BY "id" ${Prisma.raw(orderBy.toUpperCase())}
    LIMIT ${Prisma.raw(limit.toString())} OFFSET ${Prisma.raw(skip.toString())};
    `;

    return allFilteredSellers;
  }

  async getFilteredSellerCount(search: string): Promise<number> {
    const query = await this.prisma.$queryRaw<[{ count: number }]>`
    SELECT COUNT(*) as count FROM sellers
    WHERE unaccent("name") ILIKE unaccent('%' || ${search} || '%')
      OR unaccent("cpf") ILIKE unaccent('%' || ${search} || '%')
    `;

    const allFilteredSellersCount = Number(query[0]?.count || 0);

    return allFilteredSellersCount;
  }

  async getSellerByID(id: number): Promise<SellerEntity> {
    const seller = await this.prisma.seller.findUnique({
      where: { id },
    });

    if (!seller) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    return seller;
  }

  async updateSeller(
    id: number,
    updateSellerDto: UpdateSellerDto,
  ): Promise<SellerEntity> {
    const sellerAlreadyExist = await this.prisma.seller.findUnique({
      where: { id },
    });

    if (!sellerAlreadyExist) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    const updatingSeller = await this.prisma.seller.update({
      where: { id },
      data: updateSellerDto,
    });

    return updatingSeller;
  }

  async deleteSeller(id: number): Promise<IDefaultRepositoryResponse> {
    const sellerAlreadyExist = await this.prisma.seller.findUnique({
      where: { id },
    });

    if (!sellerAlreadyExist) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    await this.prisma.seller.delete({
      where: { id },
    });

    return {
      message: 'Registo excluído com sucesso!',
      statusCode: 200,
    };
  }
}
