import { AuthEntity } from '../entities/auth.entity';

export interface UserWithToken extends AuthEntity {
  accessToken: string;
  refreshToken: string;
}
