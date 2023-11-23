import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { CartItem } from 'src/app/core/models/CartItem'
import { Pizza } from 'src/app/core/models/Pizza'
import {
  BalButtonModule,
  BalCardModule,
} from '@baloise/design-system-components-angular'
import { CartListComponent } from './cart-list.component'

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CommonModule, CartListComponent, BalCardModule, BalButtonModule],
  template: `
    <bal-card>
      <bal-card-content>
        <h2 class="title is-size-3 mt-0 mb-6">Checkout</h2>
        <app-cart-list
          [items]="items"
          [readonly]="readonly"
          (addPizza)="addPizza.emit($event)"
          (removePizza)="removePizza.emit($event)">
        </app-cart-list>
        <p *ngIf="isEmpty()">Empty</p>
        <hr class="lined my-4" *ngIf="!isEmpty()" />
        <div class="is-flex my-4" *ngIf="!isEmpty()">
          <p class="is-flex-grow-1 is-bold is-lead">Total</p>
          <p class="has-text-right is-bold is-lead">
            {{ total }}
          </p>
        </div>
        <bal-button
          *ngIf="!readonly"
          class="mt-6 mb-4"
          expanded
          [disabled]="isEmpty()"
          (click)="checkout.emit()">
          Checkout
        </bal-button>
      </bal-card-content>
    </bal-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartCardComponent {
  /**
   * List of the current selected cart items.
   */
  @Input() items: CartItem[] = []
  /**
   * Total price of all the selected cart items.
   */
  @Input() total = 0
  /**
   * Amount of pizzas in the cart.
   */
  @Input() amount = 0
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
  /**
   * Event to checkout the current cart items and
   * to proceed to finish the order.
   */
  @Output() checkout = new EventEmitter<void>()

  isEmpty(): boolean {
    return this.items.length === 0
  }
}
