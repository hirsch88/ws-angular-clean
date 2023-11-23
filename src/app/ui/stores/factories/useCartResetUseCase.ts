import { CartResetUseCase } from 'src/app/core/use-cases/CartResetUseCase'

export function useCartResetUseCase(): CartResetUseCase {
  return new CartResetUseCase()
}
