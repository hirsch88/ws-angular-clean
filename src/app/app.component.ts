import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  BalButtonModule,
  BalHeadingModule,
} from '@baloise/design-system-components-angular'
import { TranslateModule } from '@ngx-translate/core'
import { HelloComponent } from './components/hello.component'
import { I18nService } from './services/i18n.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    HelloComponent,
    BalHeadingModule,
    BalButtonModule,
  ],
  template: `
    <bal-app>
      <main class="container">
        <bal-heading>{{ 'HELLO' | translate }}</bal-heading>
        <bal-button>{{ 'BUTTON' | translate }}</bal-button>

        <div class="has-background-green-3 p-large has-radius-large has-shadow">
          Hello World
        </div>

        <bal-button (click)="changeToGerman()">German</bal-button>
        <bal-button (click)="changeToEnglish()">English</bal-button>

        <nav>
          <ul>
            <li>
              <a
                routerLink="/"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >First Component</a
              >
            </li>
            <li>
              <a
                routerLink="/checkout"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >Second Component</a
              >
            </li>
          </ul>
        </nav>

        <router-outlet></router-outlet>
      </main>
    </bal-app>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'pizza-app'

  constructor(private i18nService: I18nService) {}

  changeToEnglish() {
    this.i18nService.use('en')
  }

  changeToGerman() {
    this.i18nService.use('de')
  }
}
