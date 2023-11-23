import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { Pizza } from 'src/app/core/models/Pizza'
import {
  BalButtonModule,
  BalCardModule,
} from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [CommonModule, BalCardModule, BalButtonModule],
  template: `
    <bal-card *ngIf="pizza" class="mb-4">
      <bal-card-content>
        <div class="is-flex">
          <img
            src="/assets/images/pizza.png"
            alt="pizza"
            width="120"
            height="120" />
          <div class="is-flex is-flex-direction-column pl-4 is-flex-grow-1">
            <h3 class="title is-size-4 m-0 is-flex">
              <span class="is-flex-grow-1">
                {{ pizza.name }}
              </span>
            </h3>
            <p class="has-text-hint is-small my-3">
              {{ pizza.description }}
            </p>
            <bal-button
              color="info"
              outlined
              icon="plus"
              (click)="addPizza.emit(pizza)">
              Add
            </bal-button>
          </div>
        </div>
      </bal-card-content>
    </bal-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaCardComponent {
  /**
   * Pizza domain object to display the pizza.
   */
  @Input() pizza?: Pizza
  /**
   * Event to add a pizza to the cart list.
   */
  @Output() addPizza = new EventEmitter<Pizza>()
}

/**
 *
 *           <span>
              {{ balCurrency(pizza.price) }}
            </span>

                     {{ $t('common.add') }}
 */
