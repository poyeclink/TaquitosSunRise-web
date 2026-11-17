import "server-only";

import { SendContactMessage } from "@/core/application/contact/send-contact-message";
import { GetPublicMenu } from "@/core/application/menu/get-public-menu";
import { GetRestaurantProfile } from "@/core/application/restaurant/get-restaurant-profile";
import { UnconfiguredContactInbox } from "@/infrastructure/contact/unconfigured-contact-inbox";
import { StaticMenuRepository } from "@/infrastructure/menu/static-menu-repository";
import { StaticRestaurantRepository } from "@/infrastructure/restaurant/static-restaurant-repository";

/**
 * Composition root: el único lugar donde se eligen las implementaciones concretas.
 * Las rutas de `src/app` consumen casos de uso desde aquí y nunca importan infraestructura.
 *
 * Para conectar Toast basta con cambiar `StaticMenuRepository` por `ToastMenuRepository`.
 */
const menuRepository = new StaticMenuRepository();
const restaurantRepository = new StaticRestaurantRepository();

export const getPublicMenu = new GetPublicMenu(menuRepository);
export const getRestaurantProfile = new GetRestaurantProfile(restaurantRepository);
export const sendContactMessage = new SendContactMessage(new UnconfiguredContactInbox());
