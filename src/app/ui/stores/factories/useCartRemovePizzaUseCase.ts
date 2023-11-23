import { CartRemovePizzaUseCase } from 'src/app/core/use-cases/CartRemovePizzaUseCase'

export function useCartRemovePizzaUseCase(): CartRemovePizzaUseCase {
  return new CartRemovePizzaUseCase()
}
