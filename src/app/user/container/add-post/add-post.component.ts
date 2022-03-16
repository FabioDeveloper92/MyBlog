import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TagModel } from '../../../core/model/tag.model';
import { AddPost } from '../../models/add-post.model';
import { MyPostCanBeRelated } from '../../models/my-post-can-be-related';
import { PublishBlogAction, SaveDraftBlogAction } from './add-post.actions';
import {
  selectIsBusyPublish,
  selectIsBusySaveDraft,
  selectTagsBlog,
} from './add-post.selector';
import { AddPostState } from './add-post.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
})
export class AddPostContainerComponent {
  tagsBlog$: Observable<TagModel[]>;
  isBusyPublish$: Observable<boolean>;
  isBusySaveDraft$: Observable<boolean>;
  selectPostsCanBeRelated$: Observable<MyPostCanBeRelated[]>;

  constructor(private store: Store<AddPostState>) {
    this.isBusyPublish$ = store.select(selectIsBusyPublish);
    this.isBusySaveDraft$ = store.select(selectIsBusySaveDraft);
    this.tagsBlog$ = store.select(selectTagsBlog);
    // this.selectPostsCanBeRelated$ = [];
  }

  onPublish(event: AddPost) {
    this.store.dispatch(new PublishBlogAction(event));
  }

  onSaveDraft(event: AddPost) {
    this.store.dispatch(new SaveDraftBlogAction(event));
  }
}
