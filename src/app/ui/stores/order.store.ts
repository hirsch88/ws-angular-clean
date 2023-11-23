import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { createStore, withProps, select } from '@ngneat/elf'
import { CartItem } from 'src/app/core/models/CartItem'
import { Order, useOrderDefaults } from 'src/app/core/models/Order'
import { CartStore } from './cart.store'
import { useOrderCheckoutUseCase } from './factories/useOrderCheckoutUseCase'
import { useOrderSubmitUseCase } from './factories/useOrderSubmitUseCase'

export interface OrderState {
  order: Order
  loading: boolean
  failed: boolean
}

export const orderInitialState: OrderState = {
  order: useOrderDefaults(),
  loading: false,
  failed: false,
}

const orderStore = createStore(
  { name: 'order' },
  withProps<OrderState>(orderInitialState),
)

@Injectable({
  providedIn: 'root',
})
export class OrderStore {
  state$ = orderStore.pipe(select(state => state))

  constructor(private router: Router, private cartStore: CartStore) {}

  async checkout(items: CartItem[]) {
    const useCase = useOrderCheckoutUseCase(this.router)
    const result = await useCase.execute({ items })

    if (result.isSuccess) {
      const { order } = result.value()
      orderStore.update(state => ({ ...state, order }))
    }
  }

  async submit(order: Order, items: CartItem[]) {
    orderStore.update(state => ({ ...state, loading: true, failed: false }))

    const useCase = useOrderSubmitUseCase(this.router, this.cartStore)
    const result = await useCase.execute({ order, items })

    orderStore.update(state => ({
      ...state,
      loading: false,
      failed: result.isFailure,
    }))

    if (result.isSuccess) {
      const { order: newOrder } = result.value()
      orderStore.update(state => ({ ...state, order: newOrder }))
    }
  }
}
