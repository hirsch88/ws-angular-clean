import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CartContainerComponent } from '../components/cart/cart-container.component'
import { CheckoutContainerComponent } from '../components/checkout/checkout-container.component'

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterModule, CartContainerComponent, CheckoutContainerComponent],
  template: `
    <div class="columns my-4">
      <div class="column is-8">
        <app-checkout-container></app-checkout-container>
      </div>
      <div class="column is-4">
        <app-cart-container [readonly]="true"></app-cart-container>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {}
