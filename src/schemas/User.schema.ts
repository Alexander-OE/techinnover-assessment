import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Role } from 'src/common/enums/Role.enum';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ type: String, enum: Role, default: Role.User })
  role: Role;

  @Prop({ default: false })
  isBanned: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
