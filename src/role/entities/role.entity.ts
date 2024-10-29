import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  id: number;
  role_name: string;
  created_at: Date;
  updated_at: Date;
}
