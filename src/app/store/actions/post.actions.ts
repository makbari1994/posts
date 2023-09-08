// 'https://my-json-server.typicode.com/makbari1994/inpress/posts'

import { createAction, props } from '@ngrx/store';
import { IPost } from 'src/app/pages/post/models/post-model';

/// declare cations
export const ShowAllAction = createAction('[POST] Show All');
export const ShowAllSuccessAction = createAction('[POST] Show All Success', props<{ payload: IPost[] }>());
export const CreateAction = createAction('[POST] Create', props<{ payload: IPost }>());
export const CreateSuccessAction = createAction('[POST] Create Success', props<{ payload: IPost }>());
export const CreateFailureAction = createAction('[POST] Create Failure', props<{ payload: any }>());
export const GetByIdAction = createAction('[POST] Get by Id', props<{ payload: string }>());
export const GetByIdSuccessAction = createAction('[POST] Get by Id Success', props<{ payload: IPost[] }>());
export const FilterAction = createAction('[POST] Filter', props<{ payload: IPost }>());
export const FilterSuccessAction = createAction('[POST] Filter Success', props<{ payload: IPost[] }>());
export const ResetAction = createAction('[POST] Reset'); 