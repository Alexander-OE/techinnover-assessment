import { IsBoolean, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsBoolean()
  @IsNotEmpty()
  isBanned: boolean;
}

export class ApproveProductDto {
  @IsNotEmpty()
  @IsBoolean()
  isApproved: boolean;
}
