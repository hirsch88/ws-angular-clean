import { useModelFactory } from './../../lib/index'
import { array, object, SchemaOf } from 'yup'
import produce, { Immutable } from 'immer'
import {
  calculatePrice,
  CartItem,
  createCartItem,
  useCartItemSchema,
} from './CartItem'
import { MaxShoppingCartItemAmountError } from './error/MaxShoppingCartItemAmountError'
import { MinShoppingCartItemAmountError } from './error/MinShoppingCartItemAmountError'
import { arePizzasEqual, Pizza } from './Pizza'

export type Cart = Immutable<{
  items: CartItem[]
}>

export const useCartDefaults = (): Cart => ({
  items: [],
})

export const useCartSchema = (): SchemaOf<Cart> =>
  object()
    .shape({
      items: array().of(useCartItemSchema()).ensure().required(),
    })
    .default(useCartDefaults)
    .required()

export const createCart = useModelFactory<Cart>({
  defaults: useCartDefaults,
  schema: useCartSchema,
})

export function addPizza(cart: Cart, pizza: Pizza): Cart {
  return produce(cart, draft => {
    const index = findIndex(draft, pizza)

    if (index < 0) {
      draft.items.push(createCartItem({ pizza, amount: 1 }))
      return
    }

    const { amount } = draft.items[index]
    const newAmount = amount + 1

    if (newAmount > 10) {
      throw new MaxShoppingCartItemAmountError()
    }

    draft.items[index] = createCartItem({ pizza, amount: newAmount })
  })
}

export function removePizza(cart: Cart, pizza: Pizza): Cart {
  return produce(cart, draft => {
    const index = findIndex(draft, pizza)

    if (index < 0) {
      return
    }

    const { amount } = draft.items[index]
    const newAmount = amount - 1
    if (newAmount < 0) {
      throw new MinShoppingCartItemAmountError()
    }

    draft.items[index] = createCartItem({ pizza, amount: newAmount })
  })
}

export function calculateTotal(cart: Cart): number {
  return cart.items.reduce((total, item) => (total += calculatePrice(item)), 0)
}

export function countItems(cart: Cart): number {
  return cart.items.reduce((total, item) => (total += item.amount), 0)
}

function findIndex(cart: Cart, pizza: Pizza): number {
  return cart.items.findIndex(item => arePizzasEqual(item.pizza, pizza))
}
