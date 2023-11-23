import { createOrder, useOrderSchema } from '../Order'
import { addressBasel } from './data/address.data'
import { userJohnDoe } from './data/contact.data'

describe('Service: Schema Order', () => {
  it('empty form value should throw an error', async () => {
    const schema = useOrderSchema()
    expect(() => schema.validateSync(createOrder())).toThrowError()
  })
  it('correct form value should pass', async () => {
    const schema = useOrderSchema()
    schema.validateSync(
      createOrder({
        contact: userJohnDoe,
        deliveryAddress: addressBasel,
      }),
    )
  })
})
