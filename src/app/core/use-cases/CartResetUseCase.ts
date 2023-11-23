import { Result, UseCase } from '@baloise/web-app-clean-architecture'
import { CartItem } from '../models/CartItem'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Context {}

interface Value {
  items: CartItem[]
}

export class CartResetUseCase implements UseCase<Context, Value> {
  async execute(): Promise<Result<Value, string>> {
    try {
      return Result.ok({ items: [] })
    } catch (error) {
      return Result.fail('Could not reset the shopping cart')
    }
  }
}
