'use client';

import { useState, useEffect } from 'react';
import { UserRepository } from '@/lib/repositories/user.repository';
import { Product, User } from '@/lib/types';
import { UserList } from '@/app/components/users/user-list';
import { ProductList } from '@/app/components/products/product-list';

export default function SRPDemo() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    role: 'user' as User['role'],
    createdAt: new Date().toISOString()});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const userRepo = new UserRepository();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await userRepo.findAll();
      setUsers(allUsers);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await userRepo.update(editingId, formData);
        setEditingId(null);
      } else {
        await userRepo.create(formData);
      }
      
      setFormData({ name: '', email: '', role: 'user', createdAt: new Date().toISOString() });
      await loadUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user: User) => {
    setFormData({ name: user.name, email: user.email, role: user.role, createdAt: user.createdAt });
    setEditingId(user.id);
  };

  const handleDelete = async (id: string) => {
    try {
      await userRepo.delete(id);
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SRP - Single Responsibility Principle
          </h1>
          <p className="text-gray-600 text-lg">
            Each class/component should have only one reason to change
          </p>
        </div>
        
        {/* CRUD Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit User' : 'Create New User'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                {editingId ? 'Update User' : 'Create User'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ 
                      name: '', 
                      email: '', 
                      role: 'user', 
                      createdAt: new Date().toISOString() 
                    });
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Reusable User List Component */}
        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />

        {/* SRP Explanation */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">SOLID Principles Applied</h3>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li><strong>SRP:</strong> Each component has single responsibility</li>
            <li><strong>OCP:</strong> DataList is open for extension (custom actions, renderers)</li>
            <li><strong>LSP:</strong> All list items implement IListItem interface</li>
            <li><strong>ISP:</strong> Small, focused interfaces</li>
            <li><strong>DIP:</strong> Components depend on abstractions, not concretions</li>
          </ul>
        </div>

      </div>
    </div>
  );
}