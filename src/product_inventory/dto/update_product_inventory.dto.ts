import { PartialType } from '@nestjs/mapped-types';
import { CreateProductInventoryDto } from './create_product_inventory.dto';

export class UpdateProductInventoryDto extends PartialType(CreateProductInventoryDto) {}
