import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductInventoryDto {
  @IsNumber({}, { message: 'Este campo deve ser do tipo number' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  quantity: number;
}
