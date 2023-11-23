import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  BalFieldModule,
  BalFormGridModule,
  BalInputModule,
  BalRadioModule,
  BalSelectModule,
} from '@baloise/design-system-components-angular'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ErrorComponent } from '../../../lib/error.component'
import { InvalidFieldDirective } from 'src/app/lib/invalid-field.directive'

@Component({
  selector: 'app-checkout-form-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BalFormGridModule,
    BalFieldModule,
    BalInputModule,
    BalSelectModule,
    BalRadioModule,
    ErrorComponent,
    InvalidFieldDirective,
  ],
  template: `
    <ng-container [formGroup]="contactFormGroup">
      <bal-form-grid>
        <bal-form-col>
          <bal-field appInvalidField="gender">
            <bal-field-label>Gender</bal-field-label>
            <bal-field-control>
              <!-- <bal-radio-group formControlName="gender">
                <bal-radio value="male" label="Male"></bal-radio>
                <bal-radio value="female" label="Female"></bal-radio>
              </bal-radio-group> -->
              <bal-select formControlName="gender">
                <bal-select-option label="male" value="male">
                  male
                </bal-select-option>
                <bal-select-option label="female" value="female">
                  female
                </bal-select-option>
              </bal-select>
            </bal-field-control>
          </bal-field>
        </bal-form-col>
        <bal-form-col size="half">
          <bal-field appInvalidField="firstName">
            <bal-field-label>Firstname</bal-field-label>
            <bal-field-control>
              <bal-input formControlName="firstName"></bal-input>
            </bal-field-control>
            <bal-field-message>
              <app-error [controlName]="'firstName'" error="required">
                Field is required
              </app-error>
            </bal-field-message>
          </bal-field>
        </bal-form-col>
        <bal-form-col size="half">
          <bal-field appInvalidField="lastName">
            <bal-field-label>Lastname</bal-field-label>
            <bal-field-control>
              <bal-input formControlName="lastName"></bal-input>
            </bal-field-control>
            <bal-field-message>
              <app-error [controlName]="'lastName'" error="required">
                Field is required
              </app-error>
            </bal-field-message>
          </bal-field>
        </bal-form-col>
        <bal-form-col>
          <bal-field appInvalidField="email">
            <bal-field-label>Email</bal-field-label>
            <bal-field-control>
              <bal-input formControlName="email"></bal-input>
            </bal-field-control>
            <bal-field-message>
              <app-error [controlName]="'email'" error="required">
                Field is required
              </app-error>
              <app-error [controlName]="'email'" error="email">
                Is not a valid email
              </app-error>
            </bal-field-message>
          </bal-field>
        </bal-form-col>
      </bal-form-grid>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormContactComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('formGroup') contactFormGroup!: FormGroup

  get isFirstNameInvalid() {
    return (
      this.contactFormGroup.get('firstName')?.errors !== null &&
      this.contactFormGroup.get('firstName')?.dirty
    )
  }
}
