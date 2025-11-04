import { IListItem, IListActions } from './data-list.types';
import { Button } from '../ui/button';

interface DataListActionsProps<T extends IListItem> {
  item: T;
  actions: IListActions<T>;
}

export function DataListActions<T extends IListItem>({ item, actions }: DataListActionsProps<T>) {
  const { onEdit, onDelete, onView, customActions = [] } = actions;

  return (
    <div className="flex space-x-2">
      {onView && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(item)}
        >
          View
        </Button>
      )}
      
      {onEdit && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(item)}
        >
          Edit
        </Button>
      )}
      
      {onDelete && (
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </Button>
      )}

      {/* OCP - Easy to extend with custom actions without modifying this component */}
      {customActions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'ghost'}
          size="sm"
          onClick={() => action.onClick(item)}
        >
          {action.icon}
          {action.label}
        </Button>
      ))}
    </div>
  );
}