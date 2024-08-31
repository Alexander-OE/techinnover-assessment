import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/Product.schema';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productSchema: Model<Product>,
  ) {}

  async create(
    name: string,
    description: string,
    price: number,
    userId: string,
  ) {
    const productExist = await this.productSchema.findOne({
      name,
      description,
    });

    if (productExist) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }
    const product = new this.productSchema({
      name,
      description,
      price: price.toFixed(2).toString(),
      userId,
    });

    return await product.save();
  }

  async update(
    name: string,
    description: string,
    price: number,
    productId: string,
  ) {
    const result = await this.productSchema.findByIdAndUpdate(
      { _id: productId },
      {
        name,
        description,
        price: price.toFixed(2).toString(),
      },
      { new: true },
    );

    if (!result) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return 'Product successfully updated';
  }

  async delete(productId: string) {
    const result = await this.productSchema.findByIdAndDelete({
      _id: productId,
    });
    if (!result) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return 'Product successfully deleted';
  }
}
