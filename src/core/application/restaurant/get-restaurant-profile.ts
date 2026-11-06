import type { RestaurantProfile } from "@/core/domain/restaurant/restaurant";
import type { RestaurantRepository } from "@/core/application/restaurant/restaurant-repository";

/** Caso de uso: perfil público del restaurante. */
export class GetRestaurantProfile {
  constructor(private readonly restaurants: RestaurantRepository) {}

  execute(): Promise<RestaurantProfile> {
    return this.restaurants.getProfile();
  }
}
