import { userJohnDoe } from './data/contact.data'
import { createContact, useContactDefaults } from '../Contact'

describe('Domain: Contact', () => {
  describe('constructor', () => {
    it('should create a new instance', () => {
      const contact = createContact(userJohnDoe)
      expect(contact.firstName).toBe('John')
      expect(contact.lastName).toBe('Doe')
      expect(contact.gender).toBe('male')
      expect(contact.email).toBe('john.doe@baloise.com')
    })
    it('should create an empty instance', () => {
      const contact = useContactDefaults()
      expect(contact.firstName).toBe('')
      expect(contact.lastName).toBe('')
      expect(contact.gender).toBe('male')
      expect(contact.email).toBe('')
    })
  })
})
