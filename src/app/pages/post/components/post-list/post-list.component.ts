import { Component, ViewChild } from '@angular/core';
import { IPost } from 'src/app/pages/post/models/post-model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PostState } from 'src/app/store/reducers/app.states';
import * as fromActions from 'src/app/store/actions/post.actions';
import * as fromReducer from 'src/app/store/reducers/post.reducer';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil, tap } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  posts: IPost[] = [];
  destroy = new Subject<boolean>();
  loading: boolean = true;

  displayedColumns: string[] = ['id', 'title', 'body', 'author', 'detail'];
  dataSource: MatTableDataSource<IPost>;

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private store: Store<PostState>
  ) {
  }

  ngOnInit() {
    /// reset store
    this.store.dispatch(fromActions.ResetAction());
    this.loadAllPosts();
    this.getPostsFromStore();
  }

  /// unsubscribe store for unnedded calls
  ngOnDestroy() {
    this.destroy.next(true);
  }


  /// get updated posts from store
  getPostsFromStore() {
    this.store.pipe(
      select(fromReducer.getPosts),
      takeUntil(this.destroy),
    )
      .subscribe(data => {
        this.posts = data;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

    this.store.pipe(
      select(fromReducer.getMessage),
      takeUntil(this.destroy),
    )
      .subscribe(message => {
        this.loading = false;
      })
  }


  /// dispatch store to get all posts
  loadAllPosts() {
    this.store.dispatch(fromActions.ShowAllAction());
  }


  filter(params: IPost) {
    this.store.dispatch(fromActions.ResetAction());
    this.store.dispatch(fromActions.FilterAction({ payload: params }));
    this.loading = true;
  }

}
