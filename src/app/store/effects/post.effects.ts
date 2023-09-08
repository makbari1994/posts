import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import * as fromActions from '../actions/post.actions';
import { PostService } from '../../pages/post/services/post.service';

@Injectable()
export class PostEffects {

    constructor(
        private actions$: Actions,
        private postService: PostService
    ) { }

    /// get all posts
    loadAllPosts$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ShowAllAction),
        switchMap(() =>
            this.postService.getAllPosts().pipe(
                map(data => fromActions.ShowAllSuccessAction({ payload: data }))
            )
        )
    ));

    /// create post
    createPost$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.CreateAction),
        map(action => action.payload),
        mergeMap(article =>
            this.postService.createPost(article).pipe(
                map(res => fromActions.CreateSuccessAction({ payload: res })),
                catchError(error => of(fromActions.CreateFailureAction({ payload: error })))
            )
        )
    ));

    /// get post by id
    getPostById$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.GetByIdAction),
        debounceTime(500),
        map(action => action.payload),
        switchMap(id =>
            this.postService.getPostById(id).pipe(
                map(res => fromActions.GetByIdSuccessAction({ payload: res }))
            )
        )
    ));

    /// filter by title and audit
    filterPosts$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FilterAction),
        debounceTime(500),
        map(action => action.payload),
        switchMap(({ title, author }) =>
            this.postService.filterPosts(title, author).pipe(
                map(res => fromActions.FilterSuccessAction({ payload: res }))
            )
        )
    ));

} 