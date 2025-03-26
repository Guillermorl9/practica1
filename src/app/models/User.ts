import {Product} from "./Product";
import {Order} from "./Order";

export interface User {
  uid?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  orderList: Array<Order>;
}
