import { User } from '@prisma/client';

export class AuthEntity implements User {
  id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
  phone: string;
  created_at: Date;
  updated_at: Date;
}
