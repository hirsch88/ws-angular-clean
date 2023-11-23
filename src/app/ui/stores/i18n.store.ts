import { Injectable } from '@angular/core'
import { createStore, withProps, select } from '@ngneat/elf'
import {
  BalSwissLanguage,
  onBalConfigChange,
  BalConfigState,
  updateBalAllowedLanguages,
  updateBalLanguage,
} from '@baloise/design-system-components'

export interface I18nState {
  locale: BalSwissLanguage
  allowedLanguages: BalSwissLanguage[]
}

export const i18nInitialState: I18nState = {
  locale: 'en',
  allowedLanguages: ['en', 'de'],
}

const i18nStore = createStore(
  { name: 'i18n' },
  withProps<I18nState>(i18nInitialState),
)

@Injectable({
  providedIn: 'root',
})
export class I18nStore {
  state$ = i18nStore.pipe(select(state => state))
  /**
   * Initialize the language settings for the Design System and
   * the i18n library. Listens also for language changes
   * from the Design System to update the locale state of our store.
   */
  setup(locale: BalSwissLanguage): void {
    const state = i18nStore.getValue()
    updateBalAllowedLanguages(state.allowedLanguages)
    this.use(locale)
    onBalConfigChange((config: BalConfigState) => {
      if (config.language !== state.locale) {
        state.locale = config.language as BalSwissLanguage
      }
    })
  }
  /**
   * Updates the locale / language for all parties.
   */
  use(locale: BalSwissLanguage): void {
    i18nStore.update(state => ({
      ...state,
      locale,
    }))
    updateBalLanguage(locale)
  }
}
