import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateWarehouseDto {
  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  acronym: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  name: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  description: string;

  @IsInt({ message: 'Este campo deve ser do tipo number' })
  @Min(1)
  @IsOptional()
  capacity: number;

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
