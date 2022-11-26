import { InjectionToken } from '@angular/core'
import { Action, ActionReducerMap } from '@ngrx/store'

export type Reducers<T, V extends Action = Action> =
  | ActionReducerMap<T, V>
  | InjectionToken<ActionReducerMap<T, V>>
