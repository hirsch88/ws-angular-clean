import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import {
  BalNavbarModule,
  BalTabsModule,
  BalTextModule,
} from '@baloise/design-system-components-angular'
import { filter } from 'rxjs'
import { RouterAdapter } from './adapters/RouterAdapter'
import { I18nStore } from './stores'

type TabValue = 'home' | 'checkout'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BalNavbarModule,
    BalTextModule,
    BalTabsModule,
  ],
  template: `
    <bal-app>
      <header>
        <bal-navbar interface="app">
          <bal-navbar-brand>Mamamia Pizza</bal-navbar-brand>
          <bal-navbar-menu>
            <bal-navbar-menu-start class="is-justify-content-flex-start">
              <bal-tabs
                interface="navbar"
                inverted
                [value]="tabValue"
                (balChange)="tabChanged($event)">
                <bal-tab-item value="home" label="Pizzas"></bal-tab-item>
                <bal-tab-item value="checkout" label="Checkout"></bal-tab-item>
              </bal-tabs>
            </bal-navbar-menu-start>
            <bal-navbar-menu-end></bal-navbar-menu-end>
          </bal-navbar-menu>
        </bal-navbar>
      </header>
      <main class="container">
        <router-outlet></router-outlet>
      </main>
    </bal-app>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  tabValue: TabValue = 'home'

  constructor(
    private i18nStore: I18nStore,
    private router: Router,
    private routerAdapter: RouterAdapter,
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const { url } = event as NavigationEnd
        if (url === '/') {
          this.tabValue = 'home'
        } else {
          this.tabValue = 'checkout'
        }
      })
  }

  changeToEnglish() {
    this.i18nStore.use('en')
  }

  changeToGerman() {
    this.i18nStore.use('de')
  }

  tabChanged(tabEvent: CustomEvent<string>) {
    const newTabValue = tabEvent.detail as TabValue
    if (this.tabValue !== newTabValue) {
      if (newTabValue === 'home') {
        this.routerAdapter.goToHome()
      }
      if (newTabValue === 'checkout') {
        this.routerAdapter.goToCheckout()
      }
    }
  }
}
