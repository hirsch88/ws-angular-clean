import {
  Directive,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SkipSelf,
} from '@angular/core'
import { ControlContainer, FormGroupDirective } from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'

@Directive({
  selector: '[appInvalidField]',
  standalone: true,
})
export class InvalidFieldDirective implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<boolean>()

  @Input() appInvalidField = ''

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    const formGroupDirective = this.controlContainer as FormGroupDirective
    const control = formGroupDirective.form.get(this.appInvalidField)

    if (control) {
      control.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        const isInvalid = control.dirty && control.invalid
        this.renderer.setAttribute(
          this.el.nativeElement,
          'invalid',
          JSON.stringify(isInvalid),
        )
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
