import { useModelFactory } from './../../lib/index'
import { Immutable } from 'immer'
import { object, SchemaOf, string } from 'yup'

export type Address = Immutable<{
  postalCode: string
  city: string
  street: string
  streetNumber: string
}>

export function useAddressDefaults(): Address {
  return {
    postalCode: '',
    city: '',
    street: '',
    streetNumber: '',
  }
}

export function useAddressSchema(): SchemaOf<Address> {
  return object()
    .shape({
      postalCode: string().required().length(4),
      city: string().required(),
      street: string().required(),
      streetNumber: string().required(),
    })
    .default(useAddressDefaults)
    .required()
}

export function createAddress(address?: Partial<Address>) {
  const factory = useModelFactory<Address>({
    defaults: useAddressDefaults,
    schema: useAddressSchema,
  })
  return factory(address)
}
