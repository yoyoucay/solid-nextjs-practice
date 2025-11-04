import { IStorage } from './storage.interface';

export class LocalStorageAdapter<T extends { id: string }> implements IStorage<T> {
  constructor(private storageKey: string) {}

  private getItems(): T[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private setItems(items: T[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  async getAll(): Promise<T[]> {
    return this.getItems();
  }

  async getById(id: string): Promise<T | null> {
    const items = this.getItems();
    return items.find(item => item.id === id) || null;
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const items = this.getItems();
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    } as unknown as T;
    
    items.push(newItem);
    this.setItems(items);
    return newItem;
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const items = this.getItems();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    items[index] = { 
      ...items[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.setItems(items);
    return items[index];
  }

  async delete(id: string): Promise<boolean> {
    const items = this.getItems();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    this.setItems(filteredItems);
    return true;
  }
}