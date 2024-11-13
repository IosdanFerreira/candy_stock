import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateClientDto } from '../dto/create_client.dto';
import { UpdateClientDto } from '../dto/update_client.dto';
import { ClientEntity } from '../entities/client.entity';

export interface IClientRepository {
  createClient(createClientDto: CreateClientDto): Promise<ClientEntity>;

  getAllClients(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ClientEntity[]>;

  getTotalClientCount(): Promise<number>;

  getFilteredClients(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ClientEntity[]>;

  getFilteredClientCount(search: string): Promise<number>;

  getClientByID(id: number): Promise<ClientEntity>;

  updateClient(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientEntity>;

  deleteClient(id: number): Promise<IDefaultRepositoryResponse>;
}
