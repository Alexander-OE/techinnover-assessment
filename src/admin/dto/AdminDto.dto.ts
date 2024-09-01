import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @ApiProperty({ description: 'User status', example: 'true', required: true })
  @IsBoolean()
  @IsNotEmpty()
  isBanned: boolean;
}

export class ApproveProductDto {
  @ApiProperty({
    description: 'Product status',
    example: 'true',
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isApproved: boolean;
}
