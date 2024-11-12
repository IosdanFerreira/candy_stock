import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create_seller.dto';
import { UpdateSellerDto } from './dto/update_seller.dto';
import { SellerRepository } from './repositories/seller.repository';
import { paginationMeta } from 'src/common/utils/pagination_meta.utils';

@Injectable()
export class SellerService {
  constructor(private readonly repository: SellerRepository) {}

  create(createSellerDto: CreateSellerDto) {
    return this.repository.createSeller(createSellerDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 50,
    orderBy: 'asc' | 'desc' = 'asc',
    search?: string,
  ) {
    const skip = (page - 1) * limit;

    if (search) {
      const filteredSellerCount =
        await this.repository.getFilteredSellerCount(search);

      const filteredProducts = await this.repository.getFilteredSellers(
        search,
        skip,
        limit,
        orderBy,
      );

      const filteredPagination = paginationMeta(
        filteredSellerCount,
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

    const sellersCount = await this.repository.getTotalSellerCount();

    const products = await this.repository.getAllSellers(skip, limit, orderBy);

    const pagination = paginationMeta(sellersCount, page, limit);

    return {
      data: products,
      meta: {
        ...pagination,
      },
    };
  }

  findOne(id: number) {
    return this.repository.getSellerByID(id);
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return this.repository.updateSeller(id, updateSellerDto);
  }

  remove(id: number) {
    return this.repository.deleteSeller(id);
  }
}
