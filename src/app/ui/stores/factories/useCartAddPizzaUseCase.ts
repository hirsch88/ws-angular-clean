import { CartAddPizzaUseCase } from 'src/app/core/use-cases/CartAddPizzaUseCase'

export function useCartAddPizzaUseCase(): CartAddPizzaUseCase {
  return new CartAddPizzaUseCase()
}
