import { arePizzasEqual, createPizza, usePizzaDefaults } from '../Pizza'
import { pizzaMargherita, pizzaStromboli } from './data/pizza.data'

describe('Domain: Pizza', () => {
  describe('constructor', () => {
    it('should create a new instance', () => {
      const pizza = createPizza(pizzaMargherita)
      expect(pizza.name).toBe('Margherita')
      expect(pizza.description).toBe(
        'Tomato sauce, mozzarella, organic oregano',
      )
      expect(pizza.price).toBe(16)
      expect(pizza.image).toBe('somepath')
    })
    it('should create an empty instance', () => {
      const pizza = usePizzaDefaults()
      expect(pizza.name).toBe('')
      expect(pizza.description).toBe('')
      expect(pizza.price).toBe(0)
      expect(pizza.image).toBe('')
    })
  })
  describe('isEqual', () => {
    it('margherita should be equal to margherita', () => {
      expect(arePizzasEqual(pizzaMargherita, pizzaMargherita))
    })

    it('margherita should not be equal to stromboli', () => {
      expect(arePizzasEqual(pizzaMargherita, pizzaStromboli)).toBeFalsy()
    })
  })
})
