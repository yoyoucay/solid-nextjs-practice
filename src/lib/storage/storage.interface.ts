// ISP - Interface Segregation Principle
export interface IReadableStorage<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
}

export interface IWritableStorage<T> {
  create(item: Omit<T, 'id'>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

export interface IStorage<T> extends IReadableStorage<T>, IWritableStorage<T> {}