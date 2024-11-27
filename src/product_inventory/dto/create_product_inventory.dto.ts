import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductInventoryDto {
  @IsNumber({}, { message: 'Este campo deve ser do tipo number' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  warehouse_id: number;

  @IsNumber({}, { message: 'Este campo deve ser do tipo number' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  product_id: number;

  @IsNumber({}, { message: 'Este campo deve ser do tipo number' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  quantity: number;
}
