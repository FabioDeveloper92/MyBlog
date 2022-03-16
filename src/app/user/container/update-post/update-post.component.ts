import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TagModel } from '../../../core/model/tag.model';
import { AddPost } from '../../models/add-post.model';
import { MyPostCanBeRelated as MyPostCanBeRelated } from '../../models/my-post-can-be-related';
import { UpdatePost } from '../../models/update-post.model';
import { PublishBlogAction, SaveDraftBlogAction } from './update-post.actions';
import {
  selectIsBusyPublish,
  selectIsBusySaveDraft,
  selectPostsCanBeRelated,
  selectTagsBlog,
  selectUpdatePost,
} from './update-post.selector';
import { UpdatePostState } from './update-post.state';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
})
export class UpdatePostContainerComponent {
  tagsBlog$: Observable<TagModel[]>;
  isBusyPublish$: Observable<boolean>;
  isBusySaveDraft$: Observable<boolean>;
  post$: Observable<UpdatePost>;
  selectPostsCanBeRelated$: Observable<MyPostCanBeRelated[]>;

  constructor(private store: Store<UpdatePostState>) {
    this.post$ = store.select(selectUpdatePost);
    this.isBusyPublish$ = store.select(selectIsBusyPublish);
    this.isBusySaveDraft$ = store.select(selectIsBusySaveDraft);
    this.tagsBlog$ = store.select(selectTagsBlog);
    this.selectPostsCanBeRelated$ = store.select(selectPostsCanBeRelated);
  }

  onPublish(event: AddPost) {
    this.store.dispatch(new PublishBlogAction(event));
  }

  onSaveDraft(event: AddPost) {
    this.store.dispatch(new SaveDraftBlogAction(event));
  }
}
