import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getAllusers() {
    return this.userModel.find({});
  }

  updateUser(id: number, isBanned: boolean) {
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { isBanned },
      { new: true },
    );
  }
}
