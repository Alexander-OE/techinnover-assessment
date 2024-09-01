import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Apple IPhone 15 Pro Max 256gb',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example:
      'A new 6-core GPU that promises the best gaming performance on a phone, complete with ray tracing. The new Action button is coming to the iPhone 15 Pro Max that launches the camera, voice recorder and any app you want, in addition to muting calls',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 60000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class UpdateUserProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Samsung Galaxy S22 Ultra',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example:
      'Samsung Galaxy S22 Ultra has some big shoes to fill. Attempting to appeal to both productivity focused stylus lovers and photography enthusiasts, the latest  Ultra will either be the ultimate phone, period , or fall short for either group in some way.',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 90000,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
