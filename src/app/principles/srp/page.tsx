'use client';

import { useState, useEffect } from 'react';
import { UserRepository } from '@/lib/repositories/user.repository';
import { User } from '@/lib/types';

export default function SRPDemo() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    role: 'user' as User['role'],
    createdAt: new Date().toISOString()
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const userRepo = new UserRepository();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const allUsers = await userRepo.findAll();
    setUsers(allUsers);
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
    <div className="container mx-auto px-6 py-8"> {/* Added more padding */}
      <div className="max-w-6xl mx-auto"> {/* Container for better centering */}
        
        {/* Header Section */}
        <div className="mb-8"> {/* Added margin bottom */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SRP - Single Responsibility Principle
          </h1>
          <p className="text-gray-600 text-lg">
            Each class should have only one reason to change
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
                    setFormData({ name: '', email: '', role: 'user', createdAt: new Date().toISOString() });
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold">Users ({users.length})</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {users.map(user => (
              <div key={user.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <div className="px-6 py-12 text-center text-gray-500 bg-gray-50">
                <div className="text-lg font-medium mb-2">No users found</div>
                <p className="text-gray-400">Create your first user using the form above</p>
              </div>
            )}
          </div>
        </div>

        {/* SRP Explanation */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">About SRP</h3>
          <p className="text-blue-800">
            In this example, we have separate classes for different responsibilities:
          </p>
          <ul className="list-disc list-inside text-blue-800 mt-2 space-y-1">
            <li><strong>UserRepository</strong> - Handles data access operations</li>
            <li><strong>LocalStorageAdapter</strong> - Handles storage implementation</li>
            <li><strong>UI Component</strong> - Handles presentation and user interactions</li>
          </ul>
        </div>

      </div>
    </div>
  );
}