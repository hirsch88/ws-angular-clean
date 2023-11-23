import { addressBasel } from './data/address.data'
import { createAddress, useAddressDefaults } from '../Address'

describe('Domain: Address', () => {
  describe('constructor', () => {
    it('should create a new instance', () => {
      const address = createAddress(addressBasel)
      expect(address.postalCode).toBe('4000')
      expect(address.city).toBe('Basel')
      expect(address.street).toBe('Aeschengraben')
      expect(address.streetNumber).toBe('21')
    })
    it('should create an empty instance', () => {
      const address = useAddressDefaults()
      expect(address.postalCode).toBe('')
      expect(address.city).toBe('')
      expect(address.street).toBe('')
      expect(address.streetNumber).toBe('')
    })
  })
})
