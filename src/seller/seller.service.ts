import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create_seller.dto';
import { UpdateSellerDto } from './dto/update_seller.dto';
import { SellerRepository } from './repositories/seller.repository';
import { paginationMeta } from 'src/common/utils/pagination_meta.utils';
import { NotFoundError } from 'src/common/errors/types/not-found-error';

@Injectable()
export class SellerService {
  constructor(private readonly repository: SellerRepository) {}

  async registerSeller(createSellerDto: CreateSellerDto) {
    return await this.repository.create(createSellerDto);
  }

  async getAllSellers(
    page: number = 1,
    limit: number = 50,
    orderBy: 'asc' | 'desc' = 'asc',
    search?: string,
  ) {
    const skip = (page - 1) * limit;

    if (search) {
      const filteredSellerCount =
        await this.repository.countAllFiltered(search);

      const filteredSellers = await this.repository.findAllFiltered(
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
        data: filteredSellers,
        meta: {
          ...filteredPagination,
          search,
        },
      };
    }

    const sellersCount = await this.repository.countAll();

    const products = await this.repository.findAll(skip, limit, orderBy);

    const pagination = paginationMeta(sellersCount, page, limit);

    return {
      data: products,
      meta: {
        ...pagination,
      },
    };
  }

  async getSellerByID(id: number) {
    const seller = await this.repository.findByID(id);

    if (!seller) {
      throw new NotFoundError('Nenhum vendedor com esse ID foi encontrado');
    }

    return seller;
  }

  async updateSeller(id: number, updateSellerDto: UpdateSellerDto) {
    await this.getSellerByID(id);

    return this.repository.update(id, updateSellerDto);
  }

  async deleteSeller(id: number) {
    await this.getSellerByID(id);

    return this.repository.delete(id);
  }
}
