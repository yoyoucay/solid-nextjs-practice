'use client';

import { useState } from 'react';
import { IDataListProps, IListItem } from './data-list.types';
import { DataListActions } from './data-list.actions';
import { Button } from '../ui/button';

// DIP - Depends on abstractions (interfaces), not concrete implementations
export function DataList<T extends IListItem>({
  data,
  config,
  loading = false,
  onSearch,
  onSort,
  onSelectionChange,
  className = ''
}: IDataListProps<T>) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const { columns, actions, emptyMessage = 'No data found', searchable, sortable, selectable } = config;

  const handleSort = (key: string) => {
    if (!sortable || !onSort) return;

    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    onSort(key, direction);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelected = checked ? data.map(item => item.id) : [];
    setSelectedItems(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    const newSelected = checked 
      ? [...selectedItems, id]
      : selectedItems.filter(itemId => itemId !== id);
    
    setSelectedItems(newSelected);
    onSelectionChange?.(newSelected);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {/* Header */}
      {(searchable || selectable) && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          {searchable && onSearch && (
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
          
          {selectable && data.length > 0 && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedItems.length === data.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">
                {selectedItems.length} selected
              </span>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="divide-y divide-gray-200">
        {data.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500 bg-gray-50">
            <div className="text-lg font-medium mb-2">{emptyMessage}</div>
          </div>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className={`px-6 py-4 flex items-center justify-between transition-colors ${
                selectedItems.includes(item.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              {/* Select Checkbox */}
              {selectable && (
                <div className="mr-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                    className="rounded border-gray-300"
                  />
                </div>
              )}

              {/* Data Columns */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className={`md:col-span-${12 / columns.length} ${column.className || ''}`}
                  >
                    <div className="text-sm font-medium text-gray-900 md:hidden">
                      {column.label}
                    </div>
                    <div className="mt-1 md:mt-0 gap-2">
                      {column.render 
                        ? column.render(item[column.key], item)
                        : String(item[column.key] || '-')
                      }
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              {actions && (
                <div className="ml-4 flex-shrink-0">
                  <DataListActions item={item} actions={actions} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}