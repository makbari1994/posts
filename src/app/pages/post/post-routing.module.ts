import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAppComponent } from './post-app/post-app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostCreateComponent } from './components/post-create/post-create.component';

const routes: Routes = [
  { path: '', redirectTo: "/posts", pathMatch: 'full' },
  {
    path: '', component: PostAppComponent, children: [
      { path: 'posts', component: PostListComponent },
      { path: 'post-detail/:id', component: PostDetailComponent },
      { path: 'post-create', component: PostCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
