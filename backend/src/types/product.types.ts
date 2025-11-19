// src/types/product.types.ts

export interface CreateProductDTO {
  name: string;
  price: number;
  restaurantId: number;
}

export interface UpdateProductDTO {
  name?: string;
  price?: number;
}
