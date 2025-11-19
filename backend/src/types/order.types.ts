// src/types/order.types.ts

interface OrderItemDTO {
  productId: number;
  quantity: number;
}

export interface CreateOrderDTO {
  restaurantId: number;
  items: OrderItemDTO[];
}