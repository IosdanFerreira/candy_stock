import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  name: string;

  @IsInt({ message: 'Este campo deve ser do tipo number' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  code: number;

  @IsString({ message: 'Este campo deve ser um string' })
  @IsOptional()
  description: string | null;

  @IsInt({ message: 'Este campo deve ser do tipo number' })
  @Min(0)
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  price: number;

  @IsInt({ message: 'Este campo deve ser do tipo number' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  priority_order: number;

  @IsBoolean({ message: 'Este campo deve ser do tipo boolean' })
  @IsOptional()
  icms: boolean;

  @IsString({ message: 'Este campo deve ser um string' })
  @IsOptional()
  observations: string | null;
}
