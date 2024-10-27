import { AuthEntity } from '../entities/auth.entity';

export interface UserToken extends AuthEntity {
  accessToken: string;
  refreshToken: string;
}
