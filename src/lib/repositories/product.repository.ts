import { BaseRepository } from './base.repository';
import { LocalStorageAdapter } from '../storage/localStorage.adapter';
import { Product } from '../types';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(new LocalStorageAdapter<Product>('products'));
  }

  async findByCategory(category: string): Promise<Product[]> {
    const products = await this.findAll();
    return products.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  async searchByName(name: string): Promise<Product[]> {
    const products = await this.findAll();
    return products.filter(product => 
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async findByPriceRange(min: number, max: number): Promise<Product[]> {
    const products = await this.findAll();
    return products.filter(product => 
      product.price >= min && product.price <= max
    );
  }
}