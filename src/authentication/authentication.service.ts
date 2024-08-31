import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async adminSignup(name: string, email: string, password: string) {
    const userExist = await this.userModel.findOne({ email });

    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      email,
      role: 'admin',
      password: hashedPassword,
    });

    const user = await newUser.save();

    const { password: _, ...withoutPassword } = user.toObject();
    return { withoutPassword };
  }

  async signup(name: string, email: string, password: string) {
    const userExist = await this.userModel.findOne({ email });

    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      email,
      role: 'user',
      password: hashedPassword,
    });

    const user = await newUser.save();

    const { password: _, ...withoutPassword } = user.toObject();
    return { withoutPassword };
  }

  async login(email: string, password: string) {
    const userExist = await this.userModel.findOne({ email });

    if (!userExist) {
      throw new HttpException('wrong credentials', HttpStatus.UNAUTHORIZED);
    }

    if (userExist.isBanned) {
      throw new HttpException(
        'You are banned from accessing this resource.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
      throw new HttpException('wrong credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      id: userExist._id,
      email: userExist.email,
      role: userExist.role,
      isBanned: userExist.isBanned,
    };
    const token = await this.generateUserToken(payload);

    const { password: _, ...user } = userExist.toObject();

    return {
      user,
      token,
    };
  }

  async generateUserToken(payload) {
    const accessToken = await this.jwtService.sign(payload);

    return accessToken;
  }
}
