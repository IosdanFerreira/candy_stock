import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from './create_warehouse.dto';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {}
