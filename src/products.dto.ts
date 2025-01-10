import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}

export class UpdateProductDto {
  @IsString()
  type?: string;

  @IsString()
  name?: string;

  @IsNumber()
  @Min(0)
  price?: number;
}
