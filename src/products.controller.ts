import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('product-types')
  async findDistinctProductTypes() {
    return await this.productsService.findDistinctProductTypes();
  }

  @Get('products')
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get('products/:id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Post('product')
  async create(@Body() product: CreateProductDto) {
    await this.productsService.create(product);
    return { message: 'Product added successfully' };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateProductDto) {
    await this.productsService.update(id, updateData);
    return { message: 'Product updated successfully' };
  }

  @Delete('product/:id')
  async delete(@Param('id') id: string) {
    await this.productsService.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
