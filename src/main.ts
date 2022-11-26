import { bootstrapApplication } from '@angular/platform-browser'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { BalCoreModule } from '@baloise/design-system-components-angular'

import { AppComponent } from './app/app.component'
import { routes } from './app/router/routes'
import { environment } from './environments/environment'
import { reducers, storeDevtoolsOptions } from './app/stores'

if (environment.production) {
  enableProdMode()
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
    /**
     * Share data across your components with ngrx-store.
     * Create new stores in the folder src/stores
     */
    importProvidersFrom(StoreModule.forRoot(reducers)),
    importProvidersFrom(StoreDevtoolsModule.instrument(storeDevtoolsOptions)),
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
