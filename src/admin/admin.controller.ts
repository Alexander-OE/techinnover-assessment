import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto, ApproveProductDto } from './dto/AdminDto.dto';
import { AuthenticationGuard } from 'src/common/gaurds/authentication/authentication.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/Role.enum';
import { RoleGuard } from 'src/common/gaurds/role/role.guard';

@UseGuards(AuthenticationGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('admin/users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('')
  getAllusers() {
    return this.adminService.getAllusers();
  }

  @Patch(':userId')
  updateUserStatus(
    @Param('userId') userId: string,
    @Body() adminDto: AdminDto,
  ) {
    return this.adminService.updateUserStatus(userId, adminDto.isBanned);
  }

  @Patch('product/:productId')
  updateProductStatus(
    @Param('productId') productId: string,
    @Body() approveProduct: ApproveProductDto,
  ) {
    return this.adminService.updateProductStatus(
      productId,
      approveProduct.isApproved,
    );
  }
}
