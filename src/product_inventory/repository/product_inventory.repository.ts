import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProductInventoryRepository } from '../interfaces/product_inventory_repository.interface';
import { CreateProductInventoryDto } from '../dto/create_product_inventory.dto';
import { ProductInventory } from '../entities/product_inventory.entity';

@Injectable()
export class ProductInventoryRepository implements IProductInventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addProductToWarehouse(
    createProductInventoryDto: CreateProductInventoryDto,
  ): Promise<ProductInventory> {
    const createdProductInventory = await this.prisma.warehouseProduct.create({
      data: createProductInventoryDto,
    });

    return createdProductInventory;
  }

  async getProductInventoryByID(productInventoryID: number) {
    const productInventory = await this.prisma.warehouseProduct.findUnique({
      where: {
        id: productInventoryID,
      },
      include: {
        warehouse: true,
        product: true,
      },
    });

    return productInventory;
  }
}
