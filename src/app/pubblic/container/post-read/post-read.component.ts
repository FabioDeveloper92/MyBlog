import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment.model';
import { PostDetail } from '../../models/post-detail.model';
import { OpenPostDetailAction } from '../home/home.actions';
import { AddCommentPostAction } from '../post-read/post-read.actions';
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
    console.log('TODO category ' + event);
  }

  onPostRelatedClick(event: string) {
    this.store.dispatch(new OpenPostDetailAction(event));
  }

  onAddComment(event: Comment) {
    this.store.dispatch(new AddCommentPostAction(event));
  }
}
