import { Injectable } from '@nestjs/common';
import { CreateProductInventoryDto } from './dto/create_product_inventory.dto';
import { UpdateProductInventoryDto } from './dto/update_product_inventory.dto';
import { ProductInventoryRepository } from './repository/product_inventory.repository';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { ProductService } from 'src/product/product.service';
import { NotFoundError } from 'src/common/errors/types/not-found-error';
import { paginationMeta } from 'src/common/utils/pagination_meta.utils';

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
    // Desestruturação do DTO, para tornar mais legível a utilização dos parâmetros
    const { product_id, quantity, warehouse_id } = createProductInventoryDto;

    // Checa se o armazém e o produto existem
    await Promise.all([
      await this.warehouseService.getWarehouseByID(warehouse_id),
      await this.productService.getProductByID(product_id),
    ]);

    // Checa se a quantidade que será armazenada não excede a capacidade total disponível no armazém
    await this.warehouseService.checkWarehouseCapacity(warehouse_id, quantity);

    // Se passou nas validações anteriores, vai adicionar o produto ao armazém
    const addedProductToWarehouse = await this.repository.create(
      createProductInventoryDto,
    );

    // Atualiza a quantidade armazenada após a adição do produto
    await this.warehouseService.updateStoredQuantityOnWarehouse(
      warehouse_id,
      quantity,
    );

    // retorna a operação de estocagem realizada, com os dados de estoque atualizados
    return await this.getProductInventoryOperationByID(
      addedProductToWarehouse.id,
    );
  }

  async getAllProductInventoriesOperations(
    page: number,
    limit: number,
    orderBy: 'asc' | 'desc',
    search: string,
  ) {
    const skip = (page - 1) * limit;

    // Se o campo de busca estiver preenchido na query, deve retornar o resultado com todos as operações de estocagem filtrado
    if (search) {
      // Número total de registro filtrados encontrado
      const filteredTotalItems = await this.repository.countAllFiltered(search);

      // Estrutura de paginação dos resultados filtrados
      const filteredPagination = paginationMeta(
        filteredTotalItems,
        page,
        limit,
      );
      // Total de operações de estocagem que correspondem a busca
      const filteredProductInventoriesOperations =
        await this.repository.findAllFiltered(skip, limit, orderBy, search);

      return {
        data: filteredProductInventoriesOperations,
        meta: {
          ...filteredPagination,
          search,
        },
      };
    }

    // Número total de registros de operações de estocagem encontrados no banco de dados
    const totalItems = await this.repository.countAll();

    // Estrutura de paginação para o resultado padrão
    const pagination = paginationMeta(totalItems, page, limit);

    // Dados de todas as operações de estocagem
    const allProductInventoriesOperations = await this.repository.findAll(
      skip,
      limit,
      orderBy,
    );

    return {
      data: allProductInventoriesOperations,
      meta: {
        ...pagination,
      },
    };
  }

  async getProductInventoryOperationByID(id: number) {
    const productInventoryOperation = await this.repository.findByID(id);

    if (!productInventoryOperation) {
      throw new NotFoundError(
        'Nenhuma operação de estocagem com este ID foi encontrada',
      );
    }

    return productInventoryOperation;
  }

  async updateProductQuantityInWarehouse(
    productInventoryOperationID: number,
    updateProductInventoryDto: UpdateProductInventoryDto,
  ) {
    // Checa se a operação de estocagem com o ID específico existe
    const productInventory = await this.getProductInventoryOperationByID(
      productInventoryOperationID,
    );

    // Checa se a nova quantidade não excede a capacidade do armazém
    await this.warehouseService.checkWarehouseCapacity(
      productInventory.warehouse_id,
      updateProductInventoryDto.quantity,
    );

    // Calcula a diferença na quantidade para atualizar o estoque total do armazém
    const quantityDifference =
      updateProductInventoryDto.quantity - productInventory.quantity;

    const updateProductOperation = await this.repository.update(
      productInventoryOperationID,
      updateProductInventoryDto,
    );

    await this.warehouseService.updateStoredQuantityOnWarehouse(
      productInventory.warehouse_id,
      quantityDifference,
    );

    return await this.getProductInventoryOperationByID(
      updateProductOperation.id,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} productInventory`;
  }
}
