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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  getApprovedProducts() {
    return this.userService.getApprovedProducts();
  }

  @UseGuards(AuthenticationGuard)
  @Post('')
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

  @UseGuards(AuthenticationGuard)
  @Patch(':productId')
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

  @UseGuards(AuthenticationGuard)
  @Delete(':productId')
  deleteProduct(@Param('productId') productId: string) {
    return this.userService.deleteProduct(productId);
  }
}
