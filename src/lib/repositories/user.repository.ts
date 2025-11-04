import { BaseRepository } from './base.repository';
import { LocalStorageAdapter } from '../storage/localStorage.adapter';
import { User } from '../types';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(new LocalStorageAdapter<User>('users'));
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.findAll();
    return users.find(user => user.email === email) || null;
  }

  async findByRole(role: User['role']): Promise<User[]> {
    const users = await this.findAll();
    return users.filter(user => user.role === role);
  }
}
