import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/Product.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getApprovedProducts() {
    return await this.productModel.find({ isApproved: true });
  }

  async createProduct(
    name: string,
    description: string,
    price: number,
    userId: string,
  ) {
    const productExist = await this.productModel.findOne({
      name,
      description,
    });

    if (productExist) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }
    const product = new this.productModel({
      name,
      description,
      price: price.toFixed(2).toString(),
      userId,
    });

    return await product.save();
  }

  async updateProduct(
    name: string,
    description: string,
    price: number,
    productId: string,
  ) {
    const result = await this.productModel.findByIdAndUpdate(
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

  async deleteProduct(productId: string) {
    const result = await this.productModel.findByIdAndDelete({
      _id: productId,
    });
    if (!result) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return 'Product successfully deleted';
  }
}
