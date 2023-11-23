import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckoutFormComponent } from './checkout-form.component'
import { CartStore, OrderStore } from '../../stores'
import { RouterAdapter } from '../../adapters/RouterAdapter'
import { Order } from 'src/app/core/models/Order'

@Component({
  selector: 'app-checkout-container',
  standalone: true,
  imports: [CommonModule, CheckoutFormComponent],
  template: `
    <div *ngIf="orderStore.state$ | async as state">
      <app-checkout-form
        [order]="state.order"
        [loading]="state.loading"
        (backToHome)="this.routerAdapter.goToHome()"
        (submitOrder)="submitOrder($event)">
      </app-checkout-form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutContainerComponent {
  constructor(
    public orderStore: OrderStore,
    public cartStore: CartStore,
    public routerAdapter: RouterAdapter,
  ) {}

  submitOrder(order: Order) {
    this.cartStore.state$.subscribe(state => {
      this.orderStore.submit(order, state.items)
    })
  }
}
