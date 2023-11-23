import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PizzaContainerComponent } from '../components/pizza/pizza-container.component'
import { CartContainerComponent } from '../components/cart/cart-container.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PizzaContainerComponent, CartContainerComponent],
  template: `
    <div class="columns my-4">
      <div class="column is-8">
        <app-pizza-container></app-pizza-container>
      </div>
      <div class="column is-4">
        <app-cart-container></app-cart-container>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // count$: Observable<number>
  // constructor(private store: Store<{ count: number }>) {
  //   this.count$ = store.select('count')
  // }
  // increment() {
  //   this.store.dispatch(increment())
  // }
  // decrement() {
  //   this.store.dispatch(decrement())
  // }
  // reset() {
  //   this.store.dispatch(reset())
  // }
}
