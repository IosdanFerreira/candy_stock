import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../interfaces/client_repository.interface';
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateClientDto } from '../dto/create_client.dto';
import { UpdateClientDto } from '../dto/update_client.dto';
import { ClientEntity } from '../entities/client.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'src/common/errors/types/not-found-error';
import { removeAccents } from 'src/common/utils/remove_accents.utils';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<ClientEntity> {
    const client = await this.prisma.client.create({
      data: {
        ...createClientDto,
        name_unaccented: removeAccents(createClientDto.name),
      },
      include: {
        FinancialTransaction: true,
      },
    });

    return client;
  }

  async findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ClientEntity[]> {
    const allClients = await this.prisma.client.findMany({
      skip,
      take: limit,
      orderBy: { id: orderBy },
      include: {
        FinancialTransaction: true,
      },
    });

    return allClients;
  }

  async countAll(): Promise<number> {
    const count = await this.prisma.client.count();

    return count;
  }

  async findAllFiltered(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ClientEntity[]> {
    const allFilteredClients = await this.prisma.client.findMany({
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
      },
      skip,
      take: limit,
      orderBy: { id: orderBy },
      include: {
        FinancialTransaction: true,
      },
    });

    return allFilteredClients;
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
      },
    });

    return allFilteredClientsCount;
  }

  async findByID(id: number): Promise<ClientEntity> {
    return await this.prisma.client.findUnique({
      where: { id },
      include: {
        FinancialTransaction: true,
      },
    });
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientEntity> {
    return await this.prisma.client.update({
      where: { id },
      data: {
        ...updateClientDto,
        name_unaccented: removeAccents(updateClientDto.name),
      },
      include: {
        FinancialTransaction: true,
      },
    });
  }

  async delete(id: number): Promise<IDefaultRepositoryResponse> {
    const clientAlreadyExist = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!clientAlreadyExist) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    await this.prisma.client.delete({
      where: { id },
    });

    return {
      message: 'Registo excluído com sucesso!',
      statusCode: 200,
    };
  }
}
