import { bootstrapApplication } from '@angular/platform-browser'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import {
  BalCoreModule,
  BalToastModule,
} from '@baloise/design-system-components-angular'

import { AppComponent } from './app/ui/app.component'
import { routes } from './app/ui/router/routes'
import { environment } from './environments/environment'
import { devTools } from '@ngneat/elf-devtools'
import { enableElfProdMode } from '@ngneat/elf'

if (environment.production) {
  enableProdMode()
  enableElfProdMode()
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    /**
     * Our router, which sync URLs to views in your app.
     * To define a new route open the src/router folder.
     */
    provideRouter(routes),
    /**
     * Define the Baloise Design System specifics.
     */
    importProvidersFrom(BalCoreModule.forRoot()),
    importProvidersFrom(BalToastModule),
    /**
     * The localization plugin to support multiple locals.
     * There are located in the assets/i18n folder.
     */
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
  ],
})
  /**
   * TODO asdf≈
   */
  .then(app => {
    devTools({
      postTimelineUpdate: () => app.tick(),
    })
  })
