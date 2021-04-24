import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostDetail } from '../../models/post-detail.model';
import { PostReadState } from './post-read.state';
import {selectPostDetail} from '../post-read/post-read.selectors';

@Component({
  selector: 'app-post-read',
  templateUrl: './post-read.component.html'
})
export class PostReadContainerComponent {
  postDetail$: Observable<PostDetail>;

  constructor(private store: Store<PostReadState>) {
    this.postDetail$ = this.store.select(selectPostDetail);
  }

}
