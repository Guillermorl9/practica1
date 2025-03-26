import {Product} from "./Product";

export interface Order {
  products: Array<Product>;
  precio: number;
  fecha: string;
}
