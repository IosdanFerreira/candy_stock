import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { AuthUser } from '../models/auth-user.model';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<AuthUser> {
    const { password, role_id, ...rest } = createAuthDto;

    delete createAuthDto.password;

    const data: Prisma.UserCreateInput = {
      ...rest,
      password: await bcrypt.hash(password, 10),
      role: {
        connect: { id: role_id },
      },
    };

    const createdUser = await this.prisma.user.create({
      data,
      include: {
        role: true,
      },
    });

    return createdUser;
  }

  async findUserByEmail(email: string): Promise<AuthUser> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    return existingUser;
  }
}
