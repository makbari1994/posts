import { IPost } from "src/app/pages/post/models/post-model";

export interface AppState {
    postState: PostState;
}

export interface PostState {
    posts: IPost[];
    message: any;
} 