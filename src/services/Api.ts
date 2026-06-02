import { API_URL } from "../config/config";
import type { Product, ShoppingCart, CartDetail, Sales, Bill, LoginResponse } from "../models/Types";

// AUTH
export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Credenciales inválidas");
  return res.json();
}

export async function register(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Error al registrarse");
  }
  return res.json();
}

// PRODUCTS
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Error cargando productos");
  return res.json();
}

// SHOPPING CART
export async function createCart(clientId: number): Promise<ShoppingCart> {
  const res = await fetch(`${API_URL}/shopping-carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: Number(clientId),
      createdAt: new Date().toISOString().slice(0, 19),
      status: "ACTIVE",
    }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Error creando carrito: ${msg}`);
  }
  return res.json();
}

export async function addCartDetail(
  cartId: number,
  productId: number,
  quantity: number,
  unitPrice: number
): Promise<CartDetail> {
  const res = await fetch(`${API_URL}/cart-details`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartId, productId, quantity, unitPrice }),
  });
  if (!res.ok) throw new Error("Error agregando producto al carrito");
  return res.json();
}

// SALES
export async function createSale(
  clientId: number,
  cartId: number,
  total: number
): Promise<Sales> {
  const res = await fetch(`${API_URL}/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId,
      cartId,
      total,
      saleDate: new Date().toISOString(),
      status: "COMPLETED",
    }),
  });
  if (!res.ok) throw new Error("Error creando venta");
  return res.json();
}

// BILL
export async function createBill(saleId: number, total: number): Promise<Bill> {
  const shipping = new Date();
  shipping.setDate(shipping.getDate() + 5);

  const res = await fetch(`${API_URL}/bills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      saleId,
      issueDate: new Date().toISOString(),
      shippingDate: shipping.toISOString().split("T")[0],
      totalAmount: total,
      notes: "Gracias por su compra.",
    }),
  });
  if (!res.ok) throw new Error("Error generando factura");
  return res.json();
}
