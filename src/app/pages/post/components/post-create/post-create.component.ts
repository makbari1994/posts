import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { PostState } from 'src/app/store/reducers/app.states';
import * as fromActions from 'src/app/store/actions/post.actions';
import * as fromReducer from 'src/app/store/reducers/post.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PostCreateDialogComponent } from './post-create-dialog/post-create-dialog.component';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {


  formData: FormGroup;
  submited: boolean = false;
  loading: boolean = false;
  destroy = new Subject<boolean>();
  formEvent: any;
  @ViewChild('form') form: NgForm;

  constructor(
    private store: Store<PostState>,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getCreatedPost();
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }


  /// create formGroup
  initForm() {
    this.formData = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    })
  }


  /// check validation of each field
  checkValidation(controlName: string) {
    return this.formData.controls[controlName].invalid && (this.formData.controls[controlName].touched || this.submited)
  }


  /// check created post message
  getCreatedPost() {
    this.store.pipe(
      select(fromReducer.getMessage),
      takeUntil(this.destroy)
    )
      .subscribe(message => {
        if (message == 'Posts Created.') {
          this.loading = false;
          /// open dialog 
          this.dialog.open(PostCreateDialogComponent)
          /// reset store
          this.store.dispatch(fromActions.ResetAction());
          /// reset form
          this.formData.markAsUntouched();
          this.formData.reset();
          this.form.resetForm();
          this.submited = false;
        }
      })
  }

  ///get on submit form 
  submit() {
    this.submited = true;
    if (this.formData.valid) {
      this.loading = true
      this.store.dispatch(fromActions.CreateAction({ payload: this.formData.value }));
    }
  }

}
