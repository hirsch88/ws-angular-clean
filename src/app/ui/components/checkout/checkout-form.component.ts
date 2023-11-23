import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckoutFormContactComponent } from './checkout-form-contact.component'
import { CheckoutFormAddressComponent } from './checkout-form-address.component'
import { createOrder, Order, useOrderDefaults } from 'src/app/core/models/Order'
import {
  BalButtonModule,
  BalCardModule,
} from '@baloise/design-system-components-angular'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckoutFormContactComponent,
    CheckoutFormAddressComponent,
    BalCardModule,
    BalButtonModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <bal-card class="mb-large">
        <bal-card-title>Contact</bal-card-title>
        <bal-card-content>
          <app-checkout-form-contact [formGroup]="contactFormGroup">
          </app-checkout-form-contact>
        </bal-card-content>
      </bal-card>
      <bal-card class="mb-large">
        <bal-card-title>Address</bal-card-title>
        <bal-card-content>
          <app-checkout-form-address [formGroup]="deliveryAddressFormGroup">
          </app-checkout-form-address>
        </bal-card-content>
      </bal-card>
      <bal-button-group position="right">
        <bal-button color="info" (click)="backToHome.emit()">Back</bal-button>
        <bal-button elementType="submit" [disabled]="!form.valid">
          Submit
        </bal-button>
        <bal-button elementType="submit">Submit</bal-button>
      </bal-button-group>
      {{ this.form.get('contact.gender')?.pristine }}
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent implements OnInit {
  /**
   * Domain object for the order. Used to initialize
   * the form value.
   */
  @Input() order: Order = useOrderDefaults()
  /**
   * If `true` the form is disabled and the button is
   * in a loading state.
   */
  @Input() loading = false
  /**
   * Event to submit the order to the backend.
   */
  @Output() submitOrder = new EventEmitter<Order>()
  /**
   * Event to navigate back to the home screen.
   */
  @Output() backToHome = new EventEmitter<void>()

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.get('contact.gender')?.valueChanges.subscribe(it => {
      console.error('valueChanges', it)
    })
    this.form.get('contact.gender')?.statusChanges.subscribe(it => {
      console.warn('statusChanges', it)
    })
  }

  form = this.fb.group({
    contact: this.fb.group({
      gender: ['male', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }),
    deliveryAddress: this.fb.group({
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', Validators.required],
    }),
  })

  get contactFormGroup() {
    return this.form.get('contact') as FormGroup
  }

  get deliveryAddressFormGroup() {
    return this.form.get('deliveryAddress') as FormGroup
  }

  onSubmit() {
    this.submitOrder.emit(createOrder(this.form.value as Order))
  }
}
