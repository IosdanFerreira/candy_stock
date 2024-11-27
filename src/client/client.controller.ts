import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create_client.dto';
import { UpdateClientDto } from './dto/update_client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.registerClient(createClientDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order_by') orderBy: 'asc' | 'desc',
    @Query('search') search?: string,
  ) {
    return this.clientService.getAllClients(page, limit, orderBy, search);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.getClientByID(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.deleteClient(id);
  }
}
