import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(private translate: TranslateService) {
    this.setup()
  }

  setup() {
    this.translate.addLangs(['en', 'fr'])
    this.translate.setDefaultLang('en')

    const browserLang = this.translate.getBrowserLang()
    if (browserLang) {
      this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en')
    }
  }

  use(lang: 'de' | 'en') {
    this.translate.use(lang)
  }
}
