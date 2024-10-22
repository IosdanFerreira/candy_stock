import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsString({ message: 'Este campo deve ser um string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  name: string;

  @IsString({ message: 'Este campo deve ser um string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  @IsEmail({}, { message: 'Este campo deve conter um email válido' })
  email: string;

  @IsString({ message: 'Este campo deve ser um string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha informada não é segura',
  })
  @MinLength(8, {
    message: 'A senha informada deve ter ao menos 8 caracteres',
  })
  password: string;

  @IsString({ message: 'Este campo deve ser um string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  role: 'IN' | 'OUT';

  @IsString({ message: 'Este campo deve ser um string' })
  phone?: string;
}
