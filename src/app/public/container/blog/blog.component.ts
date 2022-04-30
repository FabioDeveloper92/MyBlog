import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VoiceMenu } from '../../../core/model/voice-menu.model';
import { ResumePost } from '../../models/resume-post.model';
import {
  selectAll,
  selectIsBusyPostList,
  selectFilterByTimeVoices,
  selectOrderByVisibilityVoices,
  selectSelectTimeVoices,
  selectSelectVisibilityVoices,
} from '../blog/blog.selectors';
import { BlogState } from '../blog/blog.state';
import {
  OpenPostDetailAction,
  SelectFilterByTime,
  SelectOrderByVisibility,
} from './blog.actions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogContainerComponent implements OnInit {
  resumesPost$: Observable<ResumePost[]>;
  isBusyPostList$: Observable<boolean>;
  filterByTimeVoices$: Observable<VoiceMenu[]>;
  orderByVisibilityVoices$: Observable<VoiceMenu[]>;
  selectVisibilityVoices$: Observable<number>;
  selectTimeVoices$: Observable<number>;

  constructor(private store: Store<BlogState>) {
    this.resumesPost$ = this.store.select(selectAll);
    this.isBusyPostList$ = this.store.select(selectIsBusyPostList);
    this.orderByVisibilityVoices$ = this.store.select(
      selectOrderByVisibilityVoices
    );
    this.filterByTimeVoices$ = this.store.select(selectFilterByTimeVoices);
    this.selectVisibilityVoices$ = this.store.select(
      selectSelectVisibilityVoices
    );
    this.selectTimeVoices$ = this.store.select(selectSelectTimeVoices);
  }

  ngOnInit(): void {}

  onPostClick(event: string) {
    this.store.dispatch(new OpenPostDetailAction(event));
  }

  onCategoryClick(event: number) {
    console.log('TODO' + event);
  }

  onSelectFilterByTime(event: number) {
    this.store.dispatch(new SelectFilterByTime(event));
  }

  onSelectOrderByVisibility(event: number) {
    this.store.dispatch(new SelectOrderByVisibility(event));
  }
}
