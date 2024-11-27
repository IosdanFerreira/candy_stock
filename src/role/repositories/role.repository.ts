import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from 'src/role/dto/create_role.dto';
import { UpdateRoleDto } from '../dto/update_role.dto';
import {
  DefaultRoleResponse,
  IRoleResponse,
} from '../interfaces/role_response.interface';
import { IRoleRepository } from '../interfaces/role_repository.interface';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<IRoleResponse> {
    return await this.prisma.role.create({
      data: {
        role_name: createRoleDto.role_name,
      },
      select: {
        id: true,
        role_name: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findAll(): Promise<IRoleResponse[]> {
    return await this.prisma.role.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findByID(role_id: number): Promise<IRoleResponse> {
    return await this.prisma.role.findUnique({
      where: {
        id: role_id,
        deleted: false,
      },
    });
  }

  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<IRoleResponse> {
    return await this.prisma.role.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        role_name: updateRoleDto.role_name,
      },
    });
  }

  async delete(id: number): Promise<DefaultRoleResponse> {
    await this.prisma.role.update({
      where: {
        id,
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });

    return {
      message: 'Registo excluído com sucesso!',
      statusCode: 200,
    };
  }
}
