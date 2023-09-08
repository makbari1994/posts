import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PostState } from 'src/app/store/reducers/app.states';
import * as fromActions from 'src/app/store/actions/post.actions';
import * as fromReducer from 'src/app/store/reducers/post.reducer';
import { IPost } from 'src/app/pages/post/models/post-model';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {
  post: IPost = {} as IPost;
  destroy = new Subject<boolean>();

  constructor(
    private store: Store<PostState>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    /// reset store
    this.store.dispatch(fromActions.ResetAction());
    this.getPostById();
    this.getPostFromStore();

  }

  /// unsubscribe store for unnedded calls
  ngOnDestroy() {
    this.destroy.next(true);
  }

  /// get updated post by id 
  getPostFromStore() {
    this.store.pipe(
      select(fromReducer.getPosts),
      takeUntil(this.destroy)
    )
      .subscribe(data => {
        if (data) {
          this.post = data[0];
        }
      })
  }

  /// dispatch store to get post by id 
  getPostById() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(fromActions.GetByIdAction({ payload: String(id) }));
  }

}
