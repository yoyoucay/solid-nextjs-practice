export interface Order {
  id: string;
  userId: string;
  products: { productId: string; quantity: number }[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
  updatedAt?: string;
}
