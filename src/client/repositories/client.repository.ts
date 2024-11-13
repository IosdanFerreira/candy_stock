import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../interfaces/client_repository.interface';
import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateClientDto } from '../dto/create_client.dto';
import { UpdateClientDto } from '../dto/update_client.dto';
import { ClientEntity } from '../entities/client.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/common/errors/types/not-found-error';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
    const client = await this.prisma.client.create({
      data: createClientDto,
    });

    return client;
  }

  async getAllClients(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ClientEntity[]> {
    const allClients = await this.prisma.client.findMany({
      skip,
      take: limit,
      orderBy: { id: orderBy },
    });

    return allClients;
  }

  async getTotalClientCount(): Promise<number> {
    const count = await this.prisma.client.count();

    return count;
  }

  async getFilteredClients(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ClientEntity[]> {
    const allFilteredClients: ClientEntity[] = await this.prisma.$queryRaw`
    SELECT * FROM clients
    WHERE unaccent("name") ILIKE unaccent('%' || ${search} || '%')
      OR unaccent("cnpj") ILIKE unaccent('%' || ${search} || '%')
    ORDER BY "id" ${Prisma.raw(orderBy.toUpperCase())}
    LIMIT ${Prisma.raw(limit.toString())} OFFSET ${Prisma.raw(skip.toString())};
    `;

    return allFilteredClients;
  }

  async getFilteredClientCount(search: string): Promise<number> {
    const query = await this.prisma.$queryRaw<[{ count: number }]>`
    SELECT COUNT(*) as count FROM clients
    WHERE unaccent("name") ILIKE unaccent('%' || ${search} || '%')
      OR unaccent("cnpj") ILIKE unaccent('%' || ${search} || '%')
    `;

    const allFilteredClientsCount = Number(query[0]?.count || 0);

    return allFilteredClientsCount;
  }

  async getClientByID(id: number): Promise<ClientEntity> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    return client;
  }

  async updateClient(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientEntity> {
    const clientAlreadyExist = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!clientAlreadyExist) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    const updatingClient = await this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });

    return updatingClient;
  }

  async deleteClient(id: number): Promise<IDefaultRepositoryResponse> {
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
