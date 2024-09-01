import {
  Controller,
  Delete,
  Patch,
  Post,
  Body,
  UseGuards,
  Param,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserProductDto, UserProductDto } from './dto/Userproduct.dto';
import { AuthenticationGuard } from 'src/common/gaurds/authentication/authentication.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all approved products' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all products approved by the admin.',
  })
  getApprovedProducts() {
    return this.userService.getApprovedProducts();
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('')
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({
    status: 201,
    description: 'Product successfully created',
  })
  createProduct(
    @Body() userProductDto: UserProductDto,
    @CurrentUser() user: { id: string },
  ) {
    const userId = user?.id;

    return this.userService.createProduct(
      userProductDto.name,
      userProductDto.description,
      userProductDto.price,
      userId,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Patch(':productId')
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({
    status: 200,
    description: 'Product successfully updated.',
  })
  updateProduct(
    @Param('productId') productId: string,
    @Body() updateUserProductDto: UpdateUserProductDto,
  ) {
    return this.userService.updateProduct(
      updateUserProductDto.name,
      updateUserProductDto.description,
      updateUserProductDto.price,
      productId,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Delete(':productId')
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({
    status: 200,
    description: 'Product successfully deleted.',
  })
  deleteProduct(@Param('productId') productId: string) {
    return this.userService.deleteProduct(productId);
  }
}
