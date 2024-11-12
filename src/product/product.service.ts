// Nest
import { Injectable } from '@nestjs/common';

// DTO
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';

// Repository
import { ProductRepository } from './repositories/product.repository';

// Utils
import { paginationMeta } from 'src/common/utils/pagination_meta.utils';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  create(createProductDto: CreateProductDto) {
    return this.repository.createProduct(createProductDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 50,
    orderBy: 'asc' | 'desc' = 'asc',
    search?: string,
  ) {
    const skip = (page - 1) * limit;

    if (search) {
      const filteredTotalItems =
        await this.repository.getFilteredProductCount(search);

      const filteredProducts = await this.repository.getFilteredProducts(
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

    const totalItem = await this.repository.getTotalProductCount();

    const products = await this.repository.getAllProducts(skip, limit, orderBy);

    const pagination = paginationMeta(totalItem, page, limit);

    return {
      data: products,
      meta: {
        ...pagination,
      },
    };
  }

  findOne(id: number) {
    return this.repository.getProductByID(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.repository.updateProduct(id, updateProductDto);
  }

  remove(id: number) {
    return this.repository.deleteProduct(id);
  }
}
