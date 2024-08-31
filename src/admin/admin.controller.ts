import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/AdminDto.dto';
import { AuthenticationGuard } from 'src/common/gaurds/authentication/authentication.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/Role.enum';
import { RoleGuard } from 'src/common/gaurds/role/role.guard';

@UseGuards(AuthenticationGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('user/all')
  getAllusers() {
    return this.adminService.getAllusers();
  }

  @Patch('user/:id')
  updateUser(@Param('id') id: number, @Body() adminDto: AdminDto) {
    if (!id) {
      throw new HttpException('ID must be provided', HttpStatus.BAD_REQUEST);
    }
    console.log(id);

    return this.adminService.updateUser(id, adminDto.isBanned);
  }
}
