import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from 'src/role/dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { NotFoundError } from 'src/common/errors/types/not-found-error';
import { RoleEntity } from '../entities/role.entity';
import { DefaultRoleResponse } from '../models/default-role-response.model';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const role = await this.prisma.role.create({
      data: {
        role_name: createRoleDto.role_name,
      },
    });

    return role;
  }

  async updateRole(
    updateRoleDto: UpdateRoleDto,
    id: number,
  ): Promise<RoleEntity> {
    const existingRole = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!existingRole) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    const updatingRole = await this.prisma.role.update({
      where: { id },
      data: {
        role_name: updateRoleDto.role_name,
      },
    });

    return updatingRole;
  }

  async findAllRoles(): Promise<RoleEntity[]> {
    const allRoles = await this.prisma.role.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return allRoles;
  }

  async findRoleById(role_id: number): Promise<RoleEntity> {
    const role = await this.prisma.role.findUnique({
      where: { id: role_id },
    });

    if (!role) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    return role;
  }

  async removeRole(id: number): Promise<DefaultRoleResponse> {
    const existingRole = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!existingRole) {
      throw new NotFoundError('Nenhum registro com esse ID foi encontrado');
    }

    await this.prisma.role.delete({
      where: { id },
    });

    return {
      message: 'Registo excluído com sucesso!',
      statusCode: 200,
    };
  }
}
