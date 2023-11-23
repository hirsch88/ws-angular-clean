import { PizzaGetAllUseCase } from 'src/app/core/use-cases/PizzaGetAllUseCase'
import { PizzaApiMockAdapter } from '../../adapters/PizzaApiMockAdapter'

export function usePizzaGetAllUseCase(): PizzaGetAllUseCase {
  const api = new PizzaApiMockAdapter()

  return new PizzaGetAllUseCase(api)
}
