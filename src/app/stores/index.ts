import { Action } from '@ngrx/store'
import { StoreDevtoolsOptions } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment'
import { counterReducer } from './counter.reducer'
import type { Reducers } from './reducers'

export * from './counter.actions'
export * from './counter.reducer'

export const storeDevtoolsOptions: StoreDevtoolsOptions = {
  maxAge: 25, // Retains last 25 states
  logOnly: environment.production, // Restrict extension to log-only mode
  autoPause: true, // Pauses recording actions and state changes when the extension window is not open
}

export const reducers: Reducers<unknown, Action> = { count: counterReducer }
