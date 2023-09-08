import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.states';
import * as fromReducer from './post.reducer';

// combine reducers
export const reducers: ActionReducerMap<AppState> = {
    postState: fromReducer.postReducer
}; 