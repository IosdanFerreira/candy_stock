import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'Este campo deve conter um email válido' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  email: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  cpf: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  cnpj: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  state_registration: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  registration_date: string;

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
  whatsapp: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsOptional()
  observation: string;
}
