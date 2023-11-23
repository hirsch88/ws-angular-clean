import { usePizzaDefaults } from '../Pizza'
import { pizzaMargherita } from './data/pizza.data'
import { arePizzasEqual } from '../Pizza'
import {
  calculatePrice,
  createCartItem,
  useCartItemDefaults,
} from '../CartItem'

describe('Domain: CartItem', () => {
  describe('constructor', () => {
    it('should create a new instance', () => {
      const item = createCartItem({
        pizza: pizzaMargherita,
        amount: 1,
      })
      expect(arePizzasEqual(item.pizza, pizzaMargherita))
      expect(item.amount).toBe(1)
    })
    it('should create an empty instance', () => {
      const item = useCartItemDefaults()
      expect(arePizzasEqual(item.pizza, usePizzaDefaults()))
      expect(item.amount).toBe(0)
    })
  })

  describe('sum', () => {
    it('total should be 0 due to empty amount', () => {
      const item = createCartItem({
        pizza: pizzaMargherita,
        amount: 0,
      })
      const itemPrice = calculatePrice(item)
      expect(itemPrice).toBe(0)
    })
    it('total should be twice the product price', () => {
      const item = createCartItem({
        pizza: pizzaMargherita,
        amount: 2,
      })
      const itemPrice = calculatePrice(item)
      expect(itemPrice).toBe(32)
    })
  })
})
