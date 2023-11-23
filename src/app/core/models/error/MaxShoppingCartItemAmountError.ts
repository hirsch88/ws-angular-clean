import { DomainError } from '@baloise/web-app-clean-architecture'

export class MaxShoppingCartItemAmountError extends DomainError {
  constructor(...params: unknown[]) {
    super('MaxShoppingCartItemAmountError', ...params)
  }
}
