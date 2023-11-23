import { Injectable } from '@angular/core'
import { createStore, withProps, select } from '@ngneat/elf'
import { Pizza } from 'src/app/core/models/Pizza'
import { usePizzaGetAllUseCase } from './factories/usePizzaGetAllUseCase'

export interface PizzaState {
  items: Pizza[]
  isLoading: boolean
  hasFailed: boolean
}

export const pizzaInitialState: PizzaState = {
  items: [],
  isLoading: false,
  hasFailed: false,
}

const pizzaStore = createStore(
  { name: 'pizza' },
  withProps<PizzaState>(pizzaInitialState),
)

@Injectable({
  providedIn: 'root',
})
export class PizzaStore {
  state$ = pizzaStore.pipe(select(state => state))

  async load() {
    pizzaStore.update(state => ({ ...state, isLoading: true, hasFailed: true }))
    const useCase = usePizzaGetAllUseCase()
    const result = await useCase.execute()

    if (result.isSuccess) {
      pizzaStore.update(() => ({
        items: result.value(),
        isLoading: false,
        hasFailed: false,
      }))
    } else {
      pizzaStore.update(state => ({
        ...state,
        isLoading: false,
        hasFailed: true,
      }))
    }
  }
}
