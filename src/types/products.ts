import { TUser } from "./user";

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  photo: string;
  brand: string;
  image: string;
  price: number;
  category?: string;
  stock?: boolean
  quantity: number;
  inStock?: number;
}


export type TOrder = {
  _id: string;
  product: TProduct;
  totalAmount: number;
  currency: string;
  paymentId: string;
  status: 'Pending' | 'Shipped';
  paymentStatus: string;
  user: TUser;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
}