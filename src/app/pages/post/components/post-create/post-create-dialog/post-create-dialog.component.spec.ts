import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateDialogComponent } from './post-create-dialog.component';

describe('PostCreateDialogComponent', () => {
  let component: PostCreateDialogComponent;
  let fixture: ComponentFixture<PostCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCreateDialogComponent]
    });
    fixture = TestBed.createComponent(PostCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
