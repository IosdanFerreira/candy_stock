import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSellerDto {
  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  name: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  admission_date: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  cpf: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  birth_date: string;

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

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  phone_1: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  phone_2: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  observation: string;

  @IsOptional()
  dismissal_date: string | null;
}
