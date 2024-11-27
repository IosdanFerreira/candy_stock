// Nest
import { Injectable } from '@nestjs/common';

// DTO
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';

// Repository
import { ProductRepository } from './repositories/product.repository';

// Utils
import { paginationMeta } from 'src/common/utils/pagination_meta.utils';
import { NotFoundError } from 'src/common/errors/types/not-found-error';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async registerProduct(createProductDto: CreateProductDto) {
    return await this.repository.create(createProductDto);
  }

  async getAllProducts(
    page: number = 1,
    limit: number = 50,
    orderBy: 'asc' | 'desc' = 'asc',
    search?: string,
  ) {
    const skip = (page - 1) * limit;

    if (search) {
      const filteredTotalItems = await this.repository.countAllFiltered(search);

      const filteredProducts = await this.repository.findAllFiltered(
        search,
        skip,
        limit,
        orderBy,
      );

      const filteredPagination = paginationMeta(
        filteredTotalItems,
        page,
        limit,
      );

      return {
        data: filteredProducts,
        meta: {
          ...filteredPagination,
          search,
        },
      };
    }

    const totalItem = await this.repository.countAll();

    const products = await this.repository.findAll(skip, limit, orderBy);

    const pagination = paginationMeta(totalItem, page, limit);

    return {
      data: products,
      meta: {
        ...pagination,
      },
    };
  }

  async getProductByID(id: number) {
    const productAlreadyExist = await this.repository.findByID(id);

    if (!productAlreadyExist) {
      throw new NotFoundError('Nenhum produto com esse ID foi encontrado');
    }

    return productAlreadyExist;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    await this.getProductByID(id);

    return await this.repository.update(id, updateProductDto);
  }

  async deleteProduct(id: number) {
    await this.getProductByID(id);

    return await this.repository.delete(id);
  }
}
