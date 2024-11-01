import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { isPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @isPublic()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @isPublic()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @isPublic()
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  @isPublic()
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @isPublic()
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
