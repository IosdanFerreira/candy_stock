import { ProductEntity } from 'src/product/entities/product.entity';

export interface IWarehouseResponse {
  id: number;
  acronym: string;
  name: string;
  description: string | null;
  register_code: string;
  capacity: number;
  stored: number;
  cep: string;
  street_name: string;
  house_number: number;
  city_name: string;
  neighborhood: string;
  state: string;
  deleted?: boolean;
  stored_products: {
    product: ProductEntity;
  }[];
  created_at: Date;
  updated_at: Date;
}
