import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleRepository } from './repositories/role.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, RoleRepository],
})
export class ProductModule {}
