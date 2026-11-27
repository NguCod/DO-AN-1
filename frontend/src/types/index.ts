export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  attributes: Record<string, string | number>;
  rating?: number;
}

export interface Category { id: string; name: string; imageUrl?: string; }
export interface Brand { id: string; name: string; logoUrl?: string; }

export interface CartItem {
  id?: number;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}