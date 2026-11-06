import type { RestaurantProfile } from "@/core/domain/restaurant/restaurant";

/** Puerto: información institucional del restaurante (misión, visión, contacto). */
export interface RestaurantRepository {
  getProfile(): Promise<RestaurantProfile>;
}
