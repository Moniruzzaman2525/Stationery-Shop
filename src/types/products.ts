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
  sku?: string;
}