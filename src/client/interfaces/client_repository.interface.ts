import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateClientDto } from '../dto/create_client.dto';
import { UpdateClientDto } from '../dto/update_client.dto';
import { IClientResponse } from '../entities/client_response.interface';

export interface IClientRepository {
  create(createClientDto: CreateClientDto): Promise<IClientResponse>;

  findAll(
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IClientResponse[]>;

  countAll(): Promise<number>;

  findAllFiltered(
    search: string,
    skip: number,
    limit: number,
    orderBy: 'asc' | 'desc',
  ): Promise<IClientResponse[]>;

  countFiltered(search: string): Promise<number>;

  findByID(id: number): Promise<IClientResponse>;

  update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<IClientResponse>;

  delete(id: number): Promise<IDefaultRepositoryResponse>;
}
