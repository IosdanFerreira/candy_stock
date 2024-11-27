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
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create_seller.dto';
import { UpdateSellerDto } from './dto/update_seller.dto';

@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.registerSeller(createSellerDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order_by') orderBy: 'asc' | 'desc',
    @Query('search') search?: string,
  ) {
    return this.sellerService.getAllSellers(page, limit, orderBy, search);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sellerService.getSellerByID(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.updateSeller(id, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sellerService.deleteSeller(id);
  }
}
