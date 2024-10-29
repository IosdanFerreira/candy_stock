import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from 'src/role/dto/create-role.dto';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.prisma.role.create({
      data: {
        role_name: createRoleDto.role_name,
      },
    });

    return role;
  }

  async findAllRoles() {
    const allRoles = await this.prisma.role.findMany();

    return allRoles;
  }
}
