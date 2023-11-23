import { Result } from '@baloise/web-app-clean-architecture'
import { Pizza } from '../models/Pizza'
import { Order } from '../models/Order'
import { CartItem } from '../models/CartItem'

export interface PizzaApiCreateDto {
  order: Order
  items: CartItem[]
}

export interface PizzaApiPort {
  getAll: () => Promise<Result<Pizza[], string>>
  create: (dto: PizzaApiCreateDto) => Promise<Result<void, string>>
}
