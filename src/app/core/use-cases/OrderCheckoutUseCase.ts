import { Result, UseCase } from '@baloise/web-app-clean-architecture'
import { countItems, createCart } from '../models/Cart'
import { CartItem } from '../models/CartItem'
import { EmptyShoppingCartError } from '../models/error/EmptyShoppingCartError'
import { Order, useOrderDefaults } from '../models/Order'
import { RouterPort } from '../ports/RouterPort'

interface Context {
  items: CartItem[]
}

interface Value {
  order: Order
}

export class OrderCheckoutUseCase implements UseCase<Context, Value> {
  constructor(private readonly router: RouterPort) {}

  async execute({ items }: Context): Promise<Result<Value, string>> {
    try {
      const cart = createCart({ items })
      const amount = countItems(cart)

      if (amount <= 0) {
        throw new EmptyShoppingCartError()
      }

      const order = useOrderDefaults()
      this.router.goToCheckout()
      return Result.ok({ order })
    } catch (error) {
      console.error(error)
      return Result.fail('Could not checkout current shopping cart')
    }
  }
}
