import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PizzaListComponent } from './pizza-list.component'
import { CartStore, PizzaStore } from '../../stores'

@Component({
  selector: 'app-pizza-container',
  standalone: true,
  imports: [CommonModule, PizzaListComponent],
  template: `
    <ng-container *ngIf="pizzaStore.state$ | async as state">
      <app-pizza-list
        [loading]="state.isLoading && state.items.length === 0"
        [items]="state.items"
        (addPizza)="cartStore.addPizza($event)">
      </app-pizza-list>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaContainerComponent {
  constructor(public pizzaStore: PizzaStore, public cartStore: CartStore) {
    this.pizzaStore.load()
  }
}
