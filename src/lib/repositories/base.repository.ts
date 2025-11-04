import { IStorage } from '../storage/storage.interface';

export abstract class BaseRepository<T extends { id: string }> {
  constructor(protected storage: IStorage<T>) {}

  async findAll(): Promise<T[]> {
    return this.storage.getAll();
  }

  async findById(id: string): Promise<T | null> {
    return this.storage.getById(id);
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    return this.storage.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.storage.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }
}