import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Host,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  SkipSelf,
} from '@angular/core'
import { AbstractControl, ControlContainer } from '@angular/forms'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content *ngIf="hasError$ | async"></ng-content>`,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<boolean>()

  hasError$ = new BehaviorSubject(false)
  control?: AbstractControl | null

  @Input() error?: string

  @HostBinding('attr.controlname')
  @Input()
  controlName?: string

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
  ) {}

  ngOnChanges() {
    if (this.controlContainer) {
      if (this.controlName !== null && this.controlName !== undefined) {
        this.control = this.controlContainer.control?.get(this.controlName)
        if (this.control === undefined || this.control === null) {
          console.warn(
            '[BalNgErrorComponent] Could not find the given controlName in the form control container',
          )
        }
        this.control?.statusChanges
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.hasError$.next(this.hasError())
          })
      } else {
        console.warn('[BalNgErrorComponent] Please provide a controlName')
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  private hasError(): boolean {
    if (
      this.control === undefined ||
      this.control === null ||
      this.controlName === undefined ||
      this.controlName === null
    ) {
      return false
    } else {
      if (!this.control.dirty) {
        return false
      }

      if (this.error === undefined || this.error === null) {
        return this.control.invalid
      } else {
        const errors = this.controlContainer.control?.get(
          this.controlName,
        )?.errors
        if (errors) {
          const keys = Object.keys(errors).filter(k => k !== 'errorType')
          if (keys.length > 0) {
            const isFirstKeyOurError = keys[0] === this.error
            return isFirstKeyOurError
          }
        }
      }
    }

    return false
  }
}
