import { useModelFactory } from './../../lib/index'
import { Immutable } from 'immer'
import { mixed, object, SchemaOf, string } from 'yup'

export type Gender = 'male' | 'female'

export type Contact = Immutable<{
  gender: Gender
  firstName: string
  lastName: string
  email: string
}>

export const useContactDefaults = (): Contact => ({
  gender: 'male',
  firstName: '',
  lastName: '',
  email: '',
})

export const useContactSchema = (): SchemaOf<Contact> =>
  object()
    .shape({
      firstName: string().required(),
      lastName: string().required(),
      gender: mixed().oneOf(['male', 'female']).required(),
      email: string().email().required(),
    })
    .default(useContactDefaults)
    .required()

export const createContact = useModelFactory<Contact>({
  defaults: useContactDefaults,
  schema: useContactSchema,
})
