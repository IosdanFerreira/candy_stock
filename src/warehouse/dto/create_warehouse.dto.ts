import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateWarehouseDto {
  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  acronym: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  description: string;

  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  registration_date: string;

  @IsInt({ message: 'Este campo deve ser do tipo number' })
  @Min(1)
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  capacity: number;

  @IsInt({ message: 'Este campo deve ser do tipo number' })
  @Min(0)
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  stored: number;
}
