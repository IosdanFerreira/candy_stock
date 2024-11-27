import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateClientDto } from '../dto/create_client.dto';
import { UpdateClientDto } from '../dto/update_client.dto';
import { ClientEntity } from '../entities/client.entity';

export interface IClientRepository {
  create(createClientDto: CreateClientDto): Promise<ClientEntity>;

  findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ClientEntity[]>;

  countAll(): Promise<number>;

  findAllFiltered(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<ClientEntity[]>;

  countFiltered(search: string): Promise<number>;

  findByID(id: number): Promise<ClientEntity>;

  update(id: number, updateClientDto: UpdateClientDto): Promise<ClientEntity>;

  delete(id: number): Promise<IDefaultRepositoryResponse>;
}
