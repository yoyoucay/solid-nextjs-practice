// ISP - Small, specific interfaces
export interface IListItem {
  id: string;
  [key: string]: any;
}

export interface IListActions<T extends IListItem> {
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  onView?: (item: T) => void;
  customActions?: Array<{
    label: string;
    onClick: (item: T) => void;
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ReactNode;
  }>;
}

export interface IListColumns<T extends IListItem> {
  key: string;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface IListConfig<T extends IListItem> {
  columns: IListColumns<T>[];
  actions?: IListActions<T>;
  emptyMessage?: string;
  searchable?: boolean;
  sortable?: boolean;
  selectable?: boolean;
}

export interface IDataListProps<T extends IListItem> {
  data: T[];
  config: IListConfig<T>;
  loading?: boolean;
  onSearch?: (query: string) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  className?: string;
}