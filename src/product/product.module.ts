// Nest
import { Module } from '@nestjs/common';

// Prisma
import { PrismaService } from 'src/prisma/prisma.service';

// Repository
import { ProductRepository } from './repositories/product.repository';

// Resource
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ProductRepository],
})
export class ProductModule {}
