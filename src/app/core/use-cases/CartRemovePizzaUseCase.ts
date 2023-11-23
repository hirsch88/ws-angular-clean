import { Result, UseCase } from '@baloise/web-app-clean-architecture'
import { createCart, removePizza } from '../models/Cart'
import { CartItem } from '../models/CartItem'
import { Pizza } from '../models/Pizza'

interface Context {
  pizza: Pizza
  items: CartItem[]
}

export class CartRemovePizzaUseCase implements UseCase<Context, CartItem[]> {
  async execute({
    items,
    pizza,
  }: Context): Promise<Result<CartItem[], string>> {
    try {
      const cart = createCart({ items })
      const cartWithRemovedPizza = removePizza(cart, pizza)

      return Result.ok(cartWithRemovedPizza.items as CartItem[])
    } catch (error) {
      return Result.fail('Could not remove from shopping cart')
    }
  }
}
