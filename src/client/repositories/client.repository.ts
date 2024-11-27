import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../interfaces/client_repository.interface';
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateClientDto } from '../dto/create_client.dto';
import { UpdateClientDto } from '../dto/update_client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { removeAccents } from 'src/common/utils/remove_accents.utils';
import { IClientResponse } from '../entities/client_response.interface';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<IClientResponse> {
    return await this.prisma.client.create({
      data: {
        ...createClientDto,
        name_unaccented: removeAccents(createClientDto.name),
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        cnpj: true,
        registration_date: true,
        birth_date: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        phone_1: true,
        phone_2: true,
        whatsapp: true,
        observation: true,
        FinancialTransaction: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IClientResponse[]> {
    return await this.prisma.client.findMany({
      where: {
        deleted: false,
      },
      skip,
      take: limit,
      orderBy: { id: orderBy },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        cnpj: true,
        registration_date: true,
        birth_date: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        phone_1: true,
        phone_2: true,
        whatsapp: true,
        observation: true,
        FinancialTransaction: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async countAll(): Promise<number> {
    const count = await this.prisma.client.count({
      where: {
        deleted: false,
      },
    });

    return count;
  }

  async findAllFiltered(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IClientResponse[]> {
    return await this.prisma.client.findMany({
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
          {
            cnpj: {
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
        email: true,
        cpf: true,
        cnpj: true,
        registration_date: true,
        birth_date: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        phone_1: true,
        phone_2: true,
        whatsapp: true,
        observation: true,
        FinancialTransaction: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async countFiltered(search: string): Promise<number> {
    const allFilteredClientsCount = await this.prisma.client.count({
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
          {
            cnpj: {
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

    return allFilteredClientsCount;
  }

  async findByID(id: number): Promise<IClientResponse> {
    return await this.prisma.client.findUnique({
      where: {
        id,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        cnpj: true,
        registration_date: true,
        birth_date: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        phone_1: true,
        phone_2: true,
        whatsapp: true,
        observation: true,
        FinancialTransaction: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<IClientResponse> {
    return await this.prisma.client.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        ...updateClientDto,
        name_unaccented: removeAccents(updateClientDto.name),
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        cnpj: true,
        registration_date: true,
        birth_date: true,
        cep: true,
        street_name: true,
        house_number: true,
        city_name: true,
        neighborhood: true,
        state: true,
        phone_1: true,
        phone_2: true,
        whatsapp: true,
        observation: true,
        FinancialTransaction: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async delete(id: number): Promise<IDefaultRepositoryResponse> {
    await this.prisma.client.update({
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
