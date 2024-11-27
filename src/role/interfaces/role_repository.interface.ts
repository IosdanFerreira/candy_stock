import { IDefaultRepositoryResponse } from 'src/common/interfaces/default_repository_response.interface';
import { CreateRoleDto } from '../dto/create_role.dto';
import { UpdateRoleDto } from '../dto/update_role.dto';
import { IRoleResponse } from './role_response.interface';

export interface IRoleRepository {
  create(createRoleDto: CreateRoleDto): Promise<IRoleResponse>;
  findAll(): Promise<IRoleResponse[]>;
  findByID(id: number): Promise<IRoleResponse>;
  update(id: number, updateRoleDto: UpdateRoleDto): Promise<IRoleResponse>;
  delete(id: number): Promise<IDefaultRepositoryResponse>;
}
