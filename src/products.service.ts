import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';
import * as path from 'path';

@Injectable()
export class ProductsService {
  private csvFilePath = path.resolve(__dirname, '../data/products.csv');

  private ensureCSVFileExists() {
    if (!fs.existsSync(this.csvFilePath)) {
      fs.mkdirSync(path.dirname(this.csvFilePath), { recursive: true });
      fs.writeFileSync(this.csvFilePath, 'id,type,name,price\n'); // Create file with headers
    }
  }

  private readCSV(): Promise<any[]> {
    this.ensureCSVFileExists();
    return new Promise((resolve, reject) => {
      const rows: any[] = [];
      fs.createReadStream(this.csvFilePath)
        .pipe(fastCsv.parse({ headers: true }))
        .on('data', (data) => rows.push(data))
        .on('end', () => resolve(rows))
        .on('error', (error) => reject(error));
    });
  }

  private writeCSV(data: any[]): Promise<void> {
    this.ensureCSVFileExists();
    return new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(this.csvFilePath);
      fastCsv
        .write(data, { headers: true })
        .pipe(ws)
        .on('finish', () => resolve())
        .on('error', (error) => reject(error));
    });
  }

  async findAll(): Promise<any> {
    return { products: await this.readCSV() };
  }

  async findOne(id: string): Promise<any> {
    const data = await this.readCSV();

    const existProduct = data.find((item) => item.id === id);

    if (!existProduct) {
      throw new NotFoundException('Product not found.');
    }

    return existProduct;
  }

  async create(product: any): Promise<void> {
    const data = await this.readCSV();

    // Check for unique id
    if (data.some((item) => item.id === product.id)) {
      throw new BadRequestException(`Product with id ${product.id} already exists.`);
    }

    // Check for unique name
    if (data.some((item) => item.name === product.name)) {
      throw new BadRequestException(`Product with name ${product.name} already exists.`);
    }

    data.push(product);
    await this.writeCSV(data);
  }

  async update(id: string, updateData: any): Promise<void> {
    const data = await this.readCSV();
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updateData };
      await this.writeCSV(data);
    }
  }

  async delete(id: string): Promise<void> {
    const data = await this.readCSV();

    // Check if product exists
    const productExists = data.some((item) => item.id === id);
    if (!productExists) {
      throw new BadRequestException(`Product with id ${id} does not exist.`);
    }

    const filteredData = data.filter((item) => item.id !== id);
    await this.writeCSV(filteredData);
  }

  async findDistinctProductTypes(): Promise<any> {
    const data = await this.readCSV();
    const productTypes = data.map((item) => item.type);
    return { productTypes: [...new Set(productTypes)] };
  }
}
