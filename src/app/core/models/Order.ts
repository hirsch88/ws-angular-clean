import { useModelFactory } from './../../lib/index'
import { Immutable } from 'immer'
import { Address, useAddressDefaults, useAddressSchema } from './Address'
import { Contact, useContactDefaults, useContactSchema } from './Contact'
import { object, SchemaOf } from 'yup'

export type Order = Immutable<{
  contact: Contact
  deliveryAddress: Address
}>

export const useOrderDefaults = (): Order => ({
  contact: useContactDefaults(),
  deliveryAddress: useAddressDefaults(),
})

export const useOrderSchema = (): SchemaOf<Order> =>
  object()
    .shape({
      contact: useContactSchema(),
      deliveryAddress: useAddressSchema(),
    })
    .default(useOrderDefaults)
    .required()

export const createOrder = useModelFactory<Order>({
  defaults: useOrderDefaults,
  schema: useOrderSchema,
})
