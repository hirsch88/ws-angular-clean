import { addressBasel } from './data/address.data'
import { userJohnDoe } from './data/contact.data'
import { createOrder, useOrderDefaults } from '../Order'

describe('Domain: Order', () => {
  describe('constructor', () => {
    it('should create a new instance', () => {
      const order = createOrder({
        contact: userJohnDoe,
        deliveryAddress: addressBasel,
      })
      expect(order.contact).toBe(userJohnDoe)
      expect(order.deliveryAddress).toBe(addressBasel)
    })
    it('should create an empty instance', () => {
      const order = useOrderDefaults()
      expect(order.contact.gender).toBe('male')
      expect(order.contact.firstName).toBe('')
      expect(order.contact.lastName).toBe('')
      expect(order.contact.email).toBe('')
      expect(order.deliveryAddress.postalCode).toBe('')
      expect(order.deliveryAddress.city).toBe('')
      expect(order.deliveryAddress.street).toBe('')
      expect(order.deliveryAddress.streetNumber).toBe('')
    })
  })
})
