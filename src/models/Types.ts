export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Design {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Size {
  id: number;
  label: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  design: Design;
  size: Size;
}

export interface ShoppingCart {
  id: number;
  clientId: number;
  createdAt: string;
  status: string;
}

export interface CartDetail {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface Sales {
  id: number;
  clientId: number;
  cartId: number;
  totalAmount: number;
  saleDate: string;
  status: string;
}

export interface SaleDetail {
  id: number;
  cartId?: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  product?: Product;
}

export interface Bill {
  id: number;
  saleId: number;
  issueDate: string;
  shippingDate: string;
  totalAmount: number;
  notes: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
