import { useModelFactory } from './../../lib/index'
import { Immutable } from 'immer'
import { Pizza, usePizzaDefaults, usePizzaSchema } from './Pizza'
import { number, object, SchemaOf } from 'yup'

export type CartItem = Immutable<{
  pizza: Pizza
  amount: number
}>

export const useCartItemDefaults = (): CartItem => ({
  pizza: usePizzaDefaults(),
  amount: 0,
})

export const useCartItemSchema = (): SchemaOf<CartItem> =>
  object()
    .shape({
      pizza: usePizzaSchema(),
      amount: number().required(),
    })
    .default(useCartItemDefaults)
    .required()

export const createCartItem = useModelFactory<CartItem>({
  defaults: useCartItemDefaults,
  schema: useCartItemSchema,
})

export function calculatePrice(item: CartItem): number {
  return item.pizza.price * item.amount
}
