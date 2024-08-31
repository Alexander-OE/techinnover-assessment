import {
  Controller,
  Delete,
  Patch,
  Post,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserProductDto, UserProductDto } from './dto/Userproduct.dto';
import { AuthenticationGuard } from 'src/common/gaurds/authentication/authentication.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';

@UseGuards(AuthenticationGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  create(
    @Body() userProductDto: UserProductDto,
    @CurrentUser() user: { id: string },
  ) {
    const userId = user?.id;

    return this.userService.create(
      userProductDto.name,
      userProductDto.description,
      userProductDto.price,
      userId,
    );
  }

  @Patch(':productId')
  update(
    @Param('productId') productId: string,
    @Body() updateUserProductDto: UpdateUserProductDto,
  ) {
    return this.userService.update(
      updateUserProductDto.name,
      updateUserProductDto.description,
      updateUserProductDto.price,
      productId,
    );
  }

  @Delete(':productId')
  delete(@Param('productId') productId: string) {
    return this.userService.delete(productId);
  }
}
