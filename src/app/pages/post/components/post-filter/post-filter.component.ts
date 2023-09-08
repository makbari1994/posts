import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPost } from '../../models/post-model';
import { fromEvent, Subject } from 'rxjs'
import { debounceTime, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-post-filter',
  templateUrl: './post-filter.component.html',
  styleUrls: ['./post-filter.component.scss']
})
export class PostFilterComponent {

  formData: FormGroup;
  @Output() filterEmit = new EventEmitter<IPost>();
  @ViewChild('title') title: ElementRef;
  @ViewChild('author') author: ElementRef;
  destroy = new Subject<boolean>();


  /// call init form
  ngOnInit() {
    this.initForm();
  }

  /// handle events on field
  ngAfterViewInit() {
    this.handleEvents();
  }

  /// create formGroup
  initForm() {
    this.formData = new FormGroup({
      title: new FormControl(''),
      author: new FormControl(''),
    })
  }

  /// handle submit filter
  submit() {
    this.filterEmit.emit(this.formData.value)
  }

  /// handle keyup on title and auhtor
  handleEvents() {

    /// handle keyup for title field
    const titleKeyup = fromEvent(this.title.nativeElement, 'keyup')
    titleKeyup
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy)
      )
      .subscribe(data => {
        this.filterEmit.emit(this.formData.value)

      })

    /// handle keyup for author field
    const authorKeyup = fromEvent(this.author.nativeElement, 'keyup')
    authorKeyup
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy)
      )
      .subscribe(data => {
        this.filterEmit.emit(this.formData.value)
      })

  }


}
