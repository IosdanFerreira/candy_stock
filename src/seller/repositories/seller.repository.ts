import { Injectable } from '@nestjs/common';
import { ISellerRepository } from '../interfaces/seller_repository.interface';
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateSellerDto } from '../dto/create_seller.dto';
import { UpdateSellerDto } from '../dto/update_seller.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { removeAccents } from 'src/common/utils/remove_accents.utils';
import { ISellerResponse } from '../interfaces/seller_response.interface';

@Injectable()
export class SellerRepository implements ISellerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSellerDto: CreateSellerDto): Promise<ISellerResponse> {
    return await this.prisma.seller.create({
      data: {
        ...createSellerDto,
        name_unaccented: removeAccents(createSellerDto.name),
      },
      select: {
        id: true,
        name: true,
        name_unaccented: false,
        admission_date: true,
        cpf: true,
        birth_date: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        phone_1: true,
        phone_2: true,
        observation: true,
        dismissal_date: true,
        financial_transactions: true,
        created_at: true,
        updated_at: true,
        deleted: false,
      },
    });
  }

  async findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ISellerResponse[]> {
    return await this.prisma.seller.findMany({
      where: {
        deleted: false,
      },
      skip,
      take: limit,
      orderBy: { id: orderBy },
      select: {
        id: true,
        name: true,
        name_unaccented: false,
        admission_date: true,
        cpf: true,
        birth_date: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        phone_1: true,
        phone_2: true,
        observation: true,
        dismissal_date: true,
        financial_transactions: true,
        created_at: true,
        updated_at: true,
        deleted: false,
      },
    });
  }

  async countAll(): Promise<number> {
    return await this.prisma.seller.count({
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
  ): Promise<ISellerResponse[]> {
    return await this.prisma.seller.findMany({
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
            cpf: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
        AND: {
          deleted: false,
        },
      },
      skip,
      take: limit,
      orderBy: { id: orderBy },
      select: {
        id: true,
        name: true,
        name_unaccented: false,
        admission_date: true,
        cpf: true,
        birth_date: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        phone_1: true,
        phone_2: true,
        observation: true,
        dismissal_date: true,
        financial_transactions: true,
        created_at: true,
        updated_at: true,
        deleted: false,
      },
    });
  }

  async countAllFiltered(search: string): Promise<number> {
    return await this.prisma.seller.count({
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
            cpf: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
        AND: {
          deleted: false,
        },
      },
    });
  }

  async findByID(id: number): Promise<ISellerResponse> {
    return await this.prisma.seller.findUnique({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        name_unaccented: false,
        admission_date: true,
        cpf: true,
        birth_date: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        phone_1: true,
        phone_2: true,
        observation: true,
        dismissal_date: true,
        financial_transactions: true,
        created_at: true,
        updated_at: true,
        deleted: false,
      },
    });
  }

  async update(
    id: number,
    updateSellerDto: UpdateSellerDto,
  ): Promise<ISellerResponse> {
    return await this.prisma.seller.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        ...updateSellerDto,
        name_unaccented: removeAccents(updateSellerDto.name),
      },
      select: {
        id: true,
        name: true,
        name_unaccented: false,
        admission_date: true,
        cpf: true,
        birth_date: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        phone_1: true,
        phone_2: true,
        observation: true,
        dismissal_date: true,
        financial_transactions: true,
        created_at: true,
        updated_at: true,
        deleted: false,
      },
    });
  }

  async delete(id: number): Promise<IDefaultRepositoryResponse> {
    await this.prisma.seller.update({
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
}
