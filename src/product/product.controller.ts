import {
  Controller,
  // Get,
  Post,
  Body,
  Get,
  Query,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create_product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order_by') order_by: 'asc' | 'desc',
    @Query('search') search?: string,
  ) {
    return this.productService.findAll(page, limit, order_by, search);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
