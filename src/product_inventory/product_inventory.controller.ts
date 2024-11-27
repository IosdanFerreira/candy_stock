import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  findAll() {
    return this.productInventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productInventoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductInventoryDto: UpdateProductInventoryDto,
  ) {
    return this.productInventoryService.update(+id, updateProductInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productInventoryService.remove(+id);
  }
}
