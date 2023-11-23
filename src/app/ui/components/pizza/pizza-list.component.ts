import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { Pizza } from 'src/app/core/models/Pizza'
import { BalSpinnerModule } from '@baloise/design-system-components-angular'
import { PizzaCardComponent } from './pizza-card.component'

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [CommonModule, PizzaCardComponent, BalSpinnerModule],
  template: `
    <div
      *ngIf="loading"
      class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column mt-8">
      <bal-spinner></bal-spinner>
      <p class="is-lead has-text-centered has-text-hint py-4">Loading</p>
    </div>
    <div v-else>
      <app-pizza-card
        *ngFor="let item of items"
        [pizza]="item"
        (addPizza)="addPizza.emit($event)">
      </app-pizza-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaListComponent {
  /**
   * List of pizzas to display on the home screen.
   */
  @Input() items: Pizza[] | null = []
  /**
   * If `true` a spinner is shown.
   */
  @Input() loading: boolean | null = false
  /**
   * Event to add a pizza to the cart list.
   */
  @Output() addPizza = new EventEmitter<Pizza>()
}
