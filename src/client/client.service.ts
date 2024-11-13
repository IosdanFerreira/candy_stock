import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create_client.dto';
import { UpdateClientDto } from './dto/update_client.dto';
import { ClientRepository } from './repositories/client.repository';
import { paginationMeta } from 'src/common/utils/pagination_meta.utils';

@Injectable()
export class ClientService {
  constructor(private readonly repository: ClientRepository) {}

  create(createClientDto: CreateClientDto) {
    return this.repository.createClient(createClientDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 50,
    orderBy: 'asc' | 'desc' = 'asc',
    search?: string,
  ) {
    const skip = (page - 1) * limit;

    if (search) {
      const filteredClientCount =
        await this.repository.getFilteredClientCount(search);

      const filteredClients = await this.repository.getFilteredClients(
        search,
        skip,
        limit,
        orderBy,
      );

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

    const clientsCount = await this.repository.getTotalClientCount();

    const clients = await this.repository.getAllClients(skip, limit, orderBy);

    const pagination = paginationMeta(clientsCount, page, limit);

    return {
      data: clients,
      meta: {
        ...pagination,
      },
    };
  }

  findOne(id: number) {
    return this.repository.getClientByID(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.repository.updateClient(id, updateClientDto);
  }

  remove(id: number) {
    return this.repository.deleteClient(id);
  }
}
