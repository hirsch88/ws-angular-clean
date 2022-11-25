import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>{{ label }} works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloComponent {
  /**
   * Defines the label of the greetings
   */
  @Input() label = 'hello';
}
