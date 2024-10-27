import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * Valida o email e a senha do usuário.
   * Esse método é chamado automaticamente pelo Passport durante a autenticação.
   */
  validate(email: string, password: string) {
    return this.authService.validateUser(email, password);
  }
}
