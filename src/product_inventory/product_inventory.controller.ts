import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProductInventoryService } from './product_inventory.service';
import { CreateProductInventoryDto } from './dto/create_product_inventory.dto';
import { UpdateProductInventoryDto } from './dto/update_product_inventory.dto';

@Controller('product-inventories')
export class ProductInventoryController {
  constructor(
    private readonly productInventoryService: ProductInventoryService,
  ) {}

  @Post()
  create(@Body() createProductInventoryDto: CreateProductInventoryDto) {
    return this.productInventoryService.addProductToWarehouse(
      createProductInventoryDto,
    );
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order_by') orderBy: 'asc' | 'desc',
    @Query('search') search?: string,
  ) {
    return this.productInventoryService.getAllProductInventoriesOperations(
      page,
      limit,
      orderBy,
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productInventoryService.getProductInventoryOperationByID(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductInventoryDto: UpdateProductInventoryDto,
  ) {
    return this.productInventoryService.updateProductQuantityInWarehouse(
      id,
      updateProductInventoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productInventoryService.remove(id);
  }
}
