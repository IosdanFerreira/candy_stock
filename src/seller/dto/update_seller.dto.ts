import { PartialType } from '@nestjs/mapped-types';
import { CreateSellerDto } from './create_seller.dto';

export class UpdateSellerDto extends PartialType(CreateSellerDto) {}
