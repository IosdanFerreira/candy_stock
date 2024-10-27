import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from '../entities/auth.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<AuthEntity> {
    const { password } = createAuthDto;

    delete createAuthDto.password;

    const data: Prisma.UserCreateInput = {
      ...createAuthDto,
      password: await bcrypt.hash(password, 10),
    };

    const createdUser = await this.prisma.user.create({
      data,
    });

    return createdUser;
  }

  async findUserByEmail(email: string): Promise<AuthEntity> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    return existingUser;
  }
}
