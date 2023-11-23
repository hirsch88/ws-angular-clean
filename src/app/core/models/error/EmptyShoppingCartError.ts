import { DomainError } from '@baloise/web-app-clean-architecture'

export class EmptyShoppingCartError extends DomainError {
  constructor(...params: unknown[]) {
    super('EmptyShoppingCartError', ...params)
  }
}
