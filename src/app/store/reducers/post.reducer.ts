

import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './../actions/post.actions';
import { PostState } from './app.states';

export const initialState: PostState = { posts: [], message: '' };

// Creating reducer
const _postReducer = createReducer(
    initialState,
    on(fromActions.ShowAllSuccessAction, (state, { payload }) => ({ posts: payload, message: 'Success' })),
    on(fromActions.CreateSuccessAction, (state, { payload }) => ({ posts: [payload], message: 'Posts Created.' })),
    on(fromActions.CreateFailureAction, (state, { payload }) => ({ posts: [], message: payload })),
    on(fromActions.GetByIdSuccessAction, (state, { payload }) => ({ posts: payload, message: 'Success' })),
    on(fromActions.FilterSuccessAction, (state, { payload }) => ({ posts: payload, message: 'Success' })),
    on(fromActions.ResetAction, (state) => ({ posts: [], message: '' }))
);

export function postReducer(state: any, action: Action) {
    return _postReducer(state, action);
}

// Creating selectors
export const getPostState = createFeatureSelector<PostState>('postState');

export const getPosts = createSelector(
    getPostState,
    (state: PostState) => state.posts
);

export const getMessage = createSelector(
    getPostState,
    (state: PostState) => state.message
); 