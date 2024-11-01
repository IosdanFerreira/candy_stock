import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from 'src/role/repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}
  create(createRoleDto: CreateRoleDto) {
    return this.repository.createRole(createRoleDto);
  }

  findAll() {
    return this.repository.findAllRoles();
  }

  findOne(id: number) {
    return this.repository.findRoleById(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.repository.updateRole(updateRoleDto, id);
  }

  remove(id: number) {
    return this.repository.removeRole(id);
  }
}
