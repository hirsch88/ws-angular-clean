import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  calculatePrice,
  CartItem,
  createCartItem,
  useCartItemDefaults,
} from 'src/app/core/models/CartItem'
import { Pizza } from 'src/app/core/models/Pizza'
import { BalInputStepperModule } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-cart-list-item',
  standalone: true,
  imports: [CommonModule, BalInputStepperModule],
  template: `
    <div
      class="is-flex is-justify-content-center is-align-items-center mb-2"
      *ngIf="item">
      <h5 class="title is-size-5 m-0" style="width: 120px">
        {{ item.pizza.name }}
      </h5>
      <bal-input-stepper
        class="is-flex-grow-1"
        *ngIf="!readonly"
        min="0"
        max="10"
        [value]="item.amount"
        (balIncrease)="addPizza.emit(item.pizza)"
        (balDecrease)="removePizza.emit(item.pizza)"></bal-input-stepper>
      <p
        class="is-flex-grow-1 has-text-info has-text-rights m-0"
        *ngIf="readonly">
        x{{ item.amount }}
      </p>
      <h5 class="title is-size-5 m-0 has-text-right" style="width: 120px">
        {{ price() }}
      </h5>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListItemComponent {
  /**
   * Cart list item has a pizza and the selected
   * amount of it.
   */
  @Input() item: CartItem = useCartItemDefaults()
  /**
   * If `true` the cart items can only be viewed
   * and not changed anymore.
   */
  @Input() readonly = false
  /**
   * Event to add a pizza to the cart list.
   */
  @Output() addPizza = new EventEmitter<Pizza>()
  /**
   * Event to remove a pizza to the cart list.
   */
  @Output() removePizza = new EventEmitter<Pizza>()

  price(): number {
    return calculatePrice(createCartItem(this.item))
  }
}
