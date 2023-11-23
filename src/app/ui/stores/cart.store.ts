import { Injectable } from '@angular/core'
import { createStore, withProps, select } from '@ngneat/elf'
import { calculateTotal, countItems } from 'src/app/core/models/Cart'
import { CartItem } from 'src/app/core/models/CartItem'
import { Pizza } from 'src/app/core/models/Pizza'
import { CartStorePort } from 'src/app/core/ports/CartStorePort'
import { useCartAddPizzaUseCase } from './factories/useCartAddPizzaUseCase'
import { useCartRemovePizzaUseCase } from './factories/useCartRemovePizzaUseCase'
import { useCartResetUseCase } from './factories/useCartResetUseCase'

export interface CartState {
  items: CartItem[]
}

export const cartInitialState: CartState = {
  items: [],
}

const cartStore = createStore(
  { name: 'cart' },
  withProps<CartState>(cartInitialState),
)

@Injectable({
  providedIn: 'root',
})
export class CartStore implements CartStorePort {
  state$ = cartStore.pipe(select(state => state))
  amount$ = cartStore.pipe(select(state => countItems(state)))
  total$ = cartStore.pipe(select(state => calculateTotal(state)))

  async addPizza(pizza: Pizza) {
    const state = cartStore.getValue()
    const useCase = useCartAddPizzaUseCase()
    const result = await useCase.execute({ pizza, items: state.items })

    if (result.isSuccess) {
      cartStore.update(state => ({
        ...state,
        items: result.value(),
      }))
    }
  }

  async removePizza(pizza: Pizza) {
    const state = cartStore.getValue()
    const useCase = useCartRemovePizzaUseCase()
    const result = await useCase.execute({ pizza, items: state.items })

    if (result.isSuccess) {
      cartStore.update(state => ({
        ...state,
        items: result.value(),
      }))
    }
  }

  async reset() {
    const useCase = useCartResetUseCase()
    const result = await useCase.execute()

    if (result.isSuccess) {
      const { items } = result.value()
      cartStore.update(state => ({
        ...state,
        items,
      }))
    }
  }
}
