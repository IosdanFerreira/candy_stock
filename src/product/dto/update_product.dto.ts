import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString({ message: 'Este campo deve ser do tipo string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  name: string;

  @IsString({ message: 'Este campo deve ser um string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  description: string | null;

  @IsInt({ message: 'Este campo deve ser do tipo number' })
  @Min(0)
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  price: number;

  @IsInt({ message: 'Este campo deve ser do tipo number' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  priority_order: number;

  @IsBoolean({ message: 'Este campo deve ser do tipo boolean' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  icms: boolean;

  @IsString({ message: 'Este campo deve ser um string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  observations: string | null;
}
