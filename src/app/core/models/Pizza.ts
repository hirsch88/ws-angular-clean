import { Immutable } from 'immer'
import { object, string, SchemaOf, number } from 'yup'
import { useModelFactory } from '../../lib'

/**
 * DOMAIN MODEL
 * --------------------------------
 * TODO: describe
 */
export type Pizza = Immutable<{
  name: string
  description: string
  price: number
  image: string
}>

/**
 * DOMAIN MODEL - DEFAULTS
 * --------------------------------
 * TODO: describe
 */
export const usePizzaDefaults = (): Pizza => ({
  name: '',
  description: '',
  price: 0,
  image: '',
})

/**
 * DOMAIN MODEL - SCHEMA
 * --------------------------------
 * TODO: describe
 */
export const usePizzaSchema = (): SchemaOf<Pizza> =>
  object()
    .shape({
      name: string().required(),
      description: string().required(),
      price: number().required(),
      image: string().required(),
    })
    .default(usePizzaDefaults)
    .required()

/**
 * DOMAIN MODEL - CONSTRUCTOR
 * --------------------------------
 * TODO: describe
 */
export const createPizza = useModelFactory<Pizza>({
  defaults: usePizzaDefaults,
  schema: usePizzaSchema,
})

/**
 * DOMAIN MODEL - METHODS
 * --------------------------------
 * TODO: describe
 */
export function arePizzasEqual(pizza: Pizza, other: Pizza) {
  return pizza.name === other.name
}
