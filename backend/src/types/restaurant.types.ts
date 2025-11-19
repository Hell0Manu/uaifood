// src/types/restaurant.types.ts

export interface CreateRestaurantDTO {
  name: string;
  address: string;
}

export interface UpdateRestaurantDTO {
  name?: string;
  address?: string;
}
