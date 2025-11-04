'use client';

import { DataList } from '../data-display/data-list';
import { Badge } from '../ui/badge';
import { User } from '@/lib/types';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export function UserList({ users, onEdit, onDelete, loading }: UserListProps) {
  const userListConfig = {
    columns: [
      {
        key: 'name',
        label: 'Name',
        render: (value: string) => (
          <div className="font-semibold text-gray-900">{value}</div>
        )
      },
      {
        key: 'email',
        label: 'Email',
        render: (value: string) => (
          <div className="text-gray-600">{value}</div>
        )
      },
      {
        key: 'role',
        label: 'Role',
        render: (value: User['role']) => (
          <Badge variant={value === 'admin' ? 'info' : 'success'}>
            {value}
          </Badge>
        )
      },
      {
        key: 'createdAt',
        label: 'Created',
        render: (value: string) => (
          <div className="text-sm text-gray-500">
            {new Date(value).toLocaleDateString()}
          </div>
        )
      }
    ],
    actions: {
      onEdit,
      onDelete,
      customActions: [
        {
          label: 'View Profile',
          onClick: (item: User) => console.log('View profile:', item.id),
          variant: 'secondary' as const
        }
      ]
    },
    searchable: true,
    sortable: true,
    selectable: true,
    emptyMessage: 'No users found. Create your first user!'
  };

  return (
    <DataList
      data={users}
      config={userListConfig}
      loading={loading}
      onSearch={(query) => console.log('Search:', query)}
      onSort={(key, direction) => console.log('Sort:', key, direction)}
      onSelectionChange={(selectedIds) => console.log('Selected:', selectedIds)}
    />
  );
}