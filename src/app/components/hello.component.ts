import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      hello works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloComponent {

}
