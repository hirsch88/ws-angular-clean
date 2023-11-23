import { Router } from '@angular/router'
import { CartStorePort } from 'src/app/core/ports/CartStorePort'
import { OrderSubmitUseCase } from 'src/app/core/use-cases/OrderSubmitUseCase'
import { NotificationAdapter } from '../../adapters/NotificationAdapter'
import { PizzaApiMockAdapter } from '../../adapters/PizzaApiMockAdapter'
import { RouterAdapter } from '../../adapters/RouterAdapter'

export function useOrderSubmitUseCase(
  router: Router,
  cart: CartStorePort,
): OrderSubmitUseCase {
  const api = new PizzaApiMockAdapter()
  const notification = new NotificationAdapter()
  const vueRouter = new RouterAdapter(router)

  return new OrderSubmitUseCase(api, notification, vueRouter, cart)
}
