import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto, ApproveProductDto } from './dto/AdminDto.dto';
import { AuthenticationGuard } from 'src/common/gaurds/authentication/authentication.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/Role.enum';
import { RoleGuard } from 'src/common/gaurds/role/role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Admin')
@UseGuards(AuthenticationGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('admin/users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all users',
  })
  getAllusers() {
    return this.adminService.getAllusers();
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update user status' })
  @ApiResponse({
    status: 200,
    description: 'User status updated successfully',
  })
  updateUserStatus(
    @Param('userId') userId: string,
    @Body() adminDto: AdminDto,
  ) {
    return this.adminService.updateUserStatus(userId, adminDto.isBanned);
  }

  @Patch('product/:productId')
  @ApiOperation({ summary: 'Update product approval status' })
  @ApiResponse({
    status: 200,
    description: 'Product status updated successfully',
  })
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
