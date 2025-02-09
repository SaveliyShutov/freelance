import type { Order } from "./order.interface";

export interface Organization {
  id: string,
  title: string, // organization._id
  adress: string,
  description: string,
  rating: number,
  orders: [Order]
}
