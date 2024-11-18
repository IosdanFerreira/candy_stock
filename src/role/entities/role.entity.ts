import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  id: number;
  role_name: string;
  active_status: boolean;
  created_at: Date;
  updated_at: Date;
}
