import { Product } from "@/lib/types";
import { DataList } from "../data-display/data-list";
import { Badge } from "../ui/badge";

interface ProductListProps {
  products: Product[];
  onEdit: (products: Product) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  const productConfig = {
    columns: [
      {
        key: 'name',
        label: 'Product Name',
        render: (value: string) => <div className="font-semibold">{value}</div>
      },
      {
        key: 'price',
        label: 'Price',
        render: (value: number) => `$${value.toFixed(2)}`
      },
      {
        key: 'category',
        label: 'Category',
        render: (value: string) => <Badge variant="info">{value}</Badge>
      }
    ],
    actions: { onEdit, onDelete },
    searchable: true
  };

  return <DataList data={products} config={productConfig} />;
}