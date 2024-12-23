// Nest
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

// DTO
import { CreateWarehouseDto } from './dto/create_warehouse.dto';
import { UpdateWarehouseDto } from './dto/update_warehouse.dto';

// Resource
import { WarehouseService } from './warehouse.service';

@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.registerWarehouses(createWarehouseDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order_by') orderBy: 'asc' | 'desc',
    @Query('search') search?: string,
  ) {
    return this.warehouseService.getAllWarehouses(page, limit, orderBy, search);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.warehouseService.getWarehouseByID(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehouseService.updateWarehouse(id, updateWarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.warehouseService.deleteWarehouse(id);
  }
}
