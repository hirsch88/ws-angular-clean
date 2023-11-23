import { Router } from '@angular/router'
import { OrderCheckoutUseCase } from 'src/app/core/use-cases/OrderCheckoutUseCase'
import { RouterAdapter } from '../../adapters/RouterAdapter'

export function useOrderCheckoutUseCase(router: Router): OrderCheckoutUseCase {
  return new OrderCheckoutUseCase(new RouterAdapter(router))
}
