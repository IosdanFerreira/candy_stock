import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create_role.dto';
import { UpdateRoleDto } from './dto/update_role.dto';
import { RoleRepository } from 'src/role/repositories/role.repository';
import { DefaultRoleResponse } from './interfaces/role_response.interface';
import { NotFoundError } from 'src/common/errors/types/not-found-error';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  async registerRole(createRoleDto: CreateRoleDto) {
    return await this.repository.create(createRoleDto);
  }

  async getAllRoles() {
    return await this.repository.findAll();
  }

  async getRoleByID(id: number) {
    const role = await this.repository.findByID(id);

    if (!role) {
      throw new NotFoundError('Nenhuma permissão com esse ID foi encontrado');
    }
    return role;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    await this.getRoleByID(id);

    return await this.repository.update(id, updateRoleDto);
  }

  async deleteRole(id: number): Promise<DefaultRoleResponse> {
    await this.getRoleByID(id);

    return await this.repository.delete(id);
  }
}
