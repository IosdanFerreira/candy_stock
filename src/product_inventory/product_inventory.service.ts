import { Injectable } from '@nestjs/common';
import { CreateProductInventoryDto } from './dto/create_product_inventory.dto';
import { UpdateProductInventoryDto } from './dto/update_product_inventory.dto';
import { ProductInventoryRepository } from './repository/product_inventory.repository';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { ProductService } from 'src/product/product.service';
import { NotFoundError } from 'src/common/errors/types/not-found-error';

@Injectable()
export class ProductInventoryService {
  constructor(
    private readonly repository: ProductInventoryRepository,
    private readonly warehouseService: WarehouseService,
    private readonly productService: ProductService,
  ) {}

  async addProductToWarehouse(
    createProductInventoryDto: CreateProductInventoryDto,
  ) {
    // Desestruturação do DTO, para tornar mais legível e entendível
    const { product_id, quantity, warehouse_id } = createProductInventoryDto;

    // Checa se o armazém e o produto existem
    await Promise.all([
      await this.warehouseService.findOne(warehouse_id),
      await this.productService.getProductByID(product_id),
    ]);

    // Checa se a quantidade que será armazenada não excede a capacidade total disponível no armazém
    await this.warehouseService.checkWarehouseCapacity(warehouse_id, quantity);

    // Se passou nas validações anteriores, vai adicionar o produto ao armazém
    const addedProductToWarehouse = await this.repository.addProductToWarehouse(
      createProductInventoryDto,
    );

    // Atualiza a quantidade armazenada após a adição do produto
    await this.warehouseService.updateStoredQuantityOnWarehouse(
      warehouse_id,
      quantity,
    );

    // retorna a operação de estocagem realizada, com os dados de estoque atualizados
    const productInventoryOperation =
      await this.repository.getProductInventoryByID(addedProductToWarehouse.id);

    if (!productInventoryOperation) {
      throw new NotFoundError(
        'Nenhuma operação de estocagem com este ID foi encontrada',
      );
    }

    return productInventoryOperation;
  }

  findAll() {
    return `This action returns all productInventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productInventory`;
  }

  update(id: number, updateProductInventoryDto: UpdateProductInventoryDto) {
    return updateProductInventoryDto;
  }

  remove(id: number) {
    return `This action removes a #${id} productInventory`;
  }
}
