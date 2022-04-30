import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VoiceMenu } from '../../../core/model/voice-menu.model';
import { GoAction } from '../../../router.actions';
import { MyPost } from '../../models/my-post.model';
import { ExpandListAction, FilterByStateAction, FilterByTitleContainsAction, OrderByDateAction } from './user-area.actions';
import {
  selectIsBusyGetPosts,
  selectPosts,
  selectShowPostLimit,
  selectVoiceMenu,
  selectVoiceMenued,
} from './user-area.selector';
import { UserAreaState } from './user-area.state';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
})
export class UserAreaContainerComponent {
  voicesMenu$: Observable<VoiceMenu[]>;
  selectVoiceMenu$: Observable<number>;
  isBusyGetPosts$: Observable<boolean>;
  myPosts$: Observable<MyPost[]>;
  showPostNumber$: Observable<number>;
  
  constructor(private store: Store<UserAreaState>) {
    this.voicesMenu$ = store.select(selectVoiceMenu);
    this.selectVoiceMenu$ = store.select(selectVoiceMenued);
    this.isBusyGetPosts$ = store.select(selectIsBusyGetPosts);
    this.myPosts$ = store.select(selectPosts);
    this.showPostNumber$ = store.select(selectShowPostLimit);
  }

  public onChangeOrderBy(event: number) {
    this.store.dispatch(new OrderByDateAction(event));
  }

  public onChangeFilterState(event: number) {
    this.store.dispatch(new FilterByStateAction(event));
  }

  public onEdit(event: string) {
    this.store.dispatch(new GoAction({ path: ['updatepost', event] }));
  }
  
  public onChangeTitleContains(event: string) {
    this.store.dispatch(new FilterByTitleContainsAction(event));
  }
  
  public onShowMore(event: number) {
    this.store.dispatch(new ExpandListAction(event));
  } 
  
  public onShowLess(event: number) {
    this.store.dispatch(new ExpandListAction(event));
  }
}
