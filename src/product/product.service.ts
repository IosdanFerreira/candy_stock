import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create_product.dto';
import { ProductRepository } from './repositories/product.repository';
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

    const products = await this.repository.findAllProducts(
      skip,
      limit,
      orderBy,
    );

    const pagination = paginationMeta(totalItem, page, limit);

    return {
      data: products,
      meta: {
        ...pagination,
      },
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
