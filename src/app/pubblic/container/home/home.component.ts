import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ResumePost } from '../../models/resume-post.model';
import { OpenPostDetailAction, ResumePostListAction } from './home.actions';
import { selectAll, selectIsBusyResumePostList } from './home.selectors';
import { HomeState } from './home.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeContainerComponent implements OnInit {
  resumesPost$: Observable<ResumePost[]>;
  isBusyResumePostList$: Observable<boolean>;

  constructor(private store: Store<HomeState>) {
    this.resumesPost$ = this.store.select(selectAll);
    this.isBusyResumePostList$ = this.store.select(
      selectIsBusyResumePostList
    );
  }

  ngOnInit(): void {
    this.store.dispatch(new ResumePostListAction());
  }

  onPostClick(event: string) {
    this.store.dispatch(new OpenPostDetailAction(event));
  }

  onCategoryClick(event: number) {
    console.log('TODO' + event);
  }
}
