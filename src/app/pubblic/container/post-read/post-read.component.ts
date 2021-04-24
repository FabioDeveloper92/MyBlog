import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostDetail } from '../../models/post-detail.model';
import { selectPostDetail } from '../post-read/post-read.selectors';
import { PostReadState } from './post-read.state';

@Component({
  selector: 'app-post-read',
  templateUrl: './post-read.component.html',
})
export class PostReadContainerComponent {
  postDetail$: Observable<PostDetail>;

  constructor(private store: Store<PostReadState>) {
    this.postDetail$ = this.store.select(selectPostDetail);
  }

  onCategoryClick(event: number) {
    console.log('TODO' + event);
  }

  onPostRelatedClick(event: string) {
    console.log('TODO' + event);
  }
}
