import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create_client.dto';
import { UpdateClientDto } from './dto/update_client.dto';
import { ClientRepository } from './repositories/client.repository';
import { paginationMeta } from 'src/common/utils/pagination_meta.utils';
import { NotFoundError } from 'src/common/errors/types/not-found-error';

@Injectable()
export class ClientService {
  constructor(private readonly repository: ClientRepository) {}

  async registerClient(createClientDto: CreateClientDto) {
    return await this.repository.create(createClientDto);
  }

  async getAllClients(
    page: number = 1,
    limit: number = 50,
    orderBy: 'asc' | 'desc' = 'asc',
    search?: string,
  ) {
    const skip = (page - 1) * limit;

    // Se o campo de busca estiver preenchido na query, deve retornar o resultado com todos os clientes filtrado
    if (search) {
      // Número total de registro filtrados encontrado
      const filteredClientCount = await this.repository.countFiltered(search);

      // Total de clientes que correspondem a busca
      const filteredClients = await this.repository.findAllFiltered(
        search,
        skip,
        limit,
        orderBy,
      );

      // Estrutura de paginação dos resultados filtrados
      const filteredPagination = paginationMeta(
        filteredClientCount,
        page,
        limit,
      );

      return {
        data: filteredClients,
        meta: {
          ...filteredPagination,
          search,
        },
      };
    }

    // Número total de registros de clientes encontrados no banco de dados
    const clientsCount = await this.repository.countAll();

    // Dados de todos os clientes
    const allClients = await this.repository.findAll(skip, limit, orderBy);

    // Estrutura de paginação para o resultado padrão
    const pagination = paginationMeta(clientsCount, page, limit);

    return {
      data: allClients,
      meta: {
        ...pagination,
      },
    };
  }

  async getClientByID(id: number) {
    const client = await this.repository.findByID(id);

    if (!client) {
      throw new NotFoundError('Nenhum cliente com esse ID foi encontrado');
    }

    return client;
  }

  async updateClient(id: number, updateClientDto: UpdateClientDto) {
    await this.getClientByID(id);

    return await this.repository.update(id, updateClientDto);
  }

  async deleteClient(id: number) {
    await this.getClientByID(id);

    return await this.repository.delete(id);
  }
}
