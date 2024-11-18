import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateWarehouseDto {
  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  acronym: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  name: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  description: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  register_code: string;

  @IsInt({ message: 'Este campo deve ser do tipo number' })
  @Min(1)
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  capacity: number;

  @IsInt({ message: 'Este campo deve ser do tipo number' })
  @Min(0)
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  stored: number;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  cep: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  street_name: string;

  @IsNumber({}, { message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  house_number: number;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  city_name: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  neighborhood: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  state: string;
}
