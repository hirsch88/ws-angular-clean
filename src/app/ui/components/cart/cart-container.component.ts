import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CartCardComponent } from './cart-card.component'
import { CartStore, OrderStore } from '../../stores'

@Component({
  selector: 'app-cart-container',
  standalone: true,
  imports: [CommonModule, CartCardComponent],
  template: `
    <div *ngIf="cartStore.state$ | async as state">
      <app-cart-card
        [readonly]="readonly"
        [items]="state.items"
        [amount]="(cartStore.amount$ | async) || 0"
        [total]="(cartStore.total$ | async) || 0"
        (checkout)="checkout()"
        (addPizza)="cartStore.addPizza($event)"
        (removePizza)="cartStore.removePizza($event)">
      </app-cart-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartContainerComponent {
  /**
   * If `true` the cart items can only be viewed
   * and not changed anymore.
   */
  @Input() readonly = false

  constructor(public cartStore: CartStore, public orderStore: OrderStore) {}

  checkout() {
    this.cartStore.state$.subscribe(state =>
      this.orderStore.checkout(state.items),
    )
  }
}
