import { Product } from "./IProduct";

export type ProductPayload = Omit<Product, 'id'>
