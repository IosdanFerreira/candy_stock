import { Module } from '@nestjs/common';
import { ProductInventoryService } from './product_inventory.service';
import { ProductInventoryController } from './product_inventory.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductInventoryRepository } from './repository/product_inventory.repository';
import { ProductService } from 'src/product/product.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { WarehouseRepository } from 'src/warehouse/repositories/warehouse.repository';
import { ProductRepository } from 'src/product/repositories/product.repository';

@Module({
  controllers: [ProductInventoryController],
  providers: [
    ProductInventoryService,
    PrismaService,
    ProductInventoryRepository,
    WarehouseService,
    ProductService,
    WarehouseRepository,
    ProductRepository,
  ],
})
export class ProductInventoryModule {}
