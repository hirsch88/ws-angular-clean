import { Result, UseCase } from '@baloise/web-app-clean-architecture'
import { CartItem } from '../models/CartItem'
import { createOrder, Order, useOrderSchema } from '../models/Order'
import { countItems, createCart } from '../models/Cart'
import { RouterPort } from '../ports/RouterPort'
import { PizzaApiPort } from '../ports/PizzaApiPort'
import { NotificationPort } from '../ports/NotificationPort'
import { CartStorePort } from '../ports/CartStorePort'

interface Context {
  items: CartItem[]
  order: Order
}

interface Value {
  order: Order
}

export class OrderSubmitUseCase implements UseCase<Context, Value> {
  constructor(
    private readonly api: PizzaApiPort,
    private readonly notification: NotificationPort,
    private readonly router: RouterPort,
    private readonly cartStore: CartStorePort,
  ) {}

  async execute({ items, order }: Context): Promise<Result<Value, string>> {
    console.log(order, items)
    const cart = createCart({ items })
    const amount = countItems(cart)

    if (amount <= 0) {
      return Result.fail('Cannot submit order with empty cart')
    }

    try {
      const schema = useOrderSchema()
      await schema.validate(order)
    } catch (_) {
      return Result.fail('Invalid order form data')
    }

    const result = await this.api.create({ items, order })

    if (result.isSuccess) {
      this.notification.success()
      // await this.cartStore.reset()
      await this.router.goToHome()
      return Result.ok({ order: createOrder() })
    }
    return Result.fail('Submit request failed')
  }
}
