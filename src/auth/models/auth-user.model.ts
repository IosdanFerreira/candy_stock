import { RoleEntity } from 'src/role/entities/role.entity';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: RoleEntity;
  created_at: Date;
  updated_at: Date;
}
