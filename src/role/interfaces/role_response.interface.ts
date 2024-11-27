export interface DefaultRoleResponse {
  message: string;
  statusCode: number;
  error?: string;
}

export interface IRoleResponse {
  id: number;
  role_name: string;
  created_at: Date;
  updated_at: Date;
}
