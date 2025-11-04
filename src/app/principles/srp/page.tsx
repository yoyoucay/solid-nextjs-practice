'use client';


import { useState, useEffect } from 'react';
import { UserRepository } from '@/lib/repositories/user.repository';
import { User } from "@/lib/types/user";

export default function SRPDemo() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    role: 'user' as User['role'],
    createdAt: new Date().toISOString()
  });
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
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
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
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setFormData({ 
      name: user.name, 
      email: user.email, 
      role: user.role,
      createdAt: user.createdAt
    });
    setEditingId(user.id);
  };
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    setLoading(true);
    try {
      await userRepo.delete(id);
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Single Responsibility Principle</h1>
        <p className="text-gray-600">
          Each class has only one responsibility. UserRepository handles user data, 
          LocalStorageAdapter handles storage, etc.
        </p>
      </div>

      {/* CRUD Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit User' : 'Create New User'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="flex space-x-3">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editingId ? 'Update User' : 'Create User')}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', email: '', role: 'user', createdAt: new Date().toISOString() });
                }}
                disabled={loading}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Users ({users.length})</h2>
        
        {loading ? (
          <div className="text-center py-4">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No users found. Create your first user above!
          </div>
        ) : (
          <div className="space-y-3">
            {users.map(user => (
              <div key={user.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(user)}
                    disabled={loading}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    disabled={loading}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}