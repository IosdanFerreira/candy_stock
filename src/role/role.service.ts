import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from 'src/role/repositories/role.repository';
import { RoleEntity } from './entities/role.entity';
import { DefaultRoleResponse } from './models/default-role-response.model';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}
  create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.repository.createRole(createRoleDto);
  }

  findAll(): Promise<RoleEntity[]> {
    return this.repository.findAllRoles();
  }

  findOne(id: number): Promise<RoleEntity> {
    return this.repository.findRoleById(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    return this.repository.updateRole(updateRoleDto, id);
  }

  remove(id: number): Promise<DefaultRoleResponse> {
    return this.repository.removeRole(id);
  }
}
