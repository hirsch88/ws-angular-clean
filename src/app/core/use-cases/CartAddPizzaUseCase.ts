import { Result, UseCase } from '@baloise/web-app-clean-architecture'
import { CartItem } from '../models/CartItem'
import { addPizza, createCart } from '../models/Cart'
import { Pizza } from '../models/Pizza'

interface Context {
  pizza: Pizza
  items: CartItem[]
}

export class CartAddPizzaUseCase implements UseCase<Context, CartItem[]> {
  async execute({
    items,
    pizza,
  }: Context): Promise<Result<CartItem[], string>> {
    try {
      const cart = createCart({ items })
      const cartWithNewPizza = addPizza(cart, pizza)

      return Result.ok(cartWithNewPizza.items as CartItem[])
    } catch (error) {
      return Result.fail('Could not add to the shopping cart')
    }
  }
}
