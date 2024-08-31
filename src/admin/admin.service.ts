import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/Product.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  getAllusers() {
    return this.userModel.find({});
  }

  async updateUserStatus(userId: string, isBanned: boolean) {
    const result = await this.userModel.findByIdAndUpdate(
      { _id: userId },
      { isBanned },
      { new: true },
    );

    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: {
        message: `User status updated successfully .`,
      },
    };
  }

  async updateProductStatus(productId: string, isApproved: boolean) {
    const result = await this.productModel.findByIdAndUpdate(
      { _id: productId },
      { isApproved },
      { new: true },
    );

    if (!result) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: {
        message: `Product status updated successfully .`,
      },
    };
  }
}
