import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from '../../../core/model/select-item.model';
import { MyPostOrderByStatus } from '../../models/my-post-order-by-status.model';
import { MyPostStatus } from '../../models/my-post-status.model';
import { MyPost } from '../../models/my-post.model';

@Component({
  selector: 'app-my-post-list',
  templateUrl: './my-post-list.component.html',
  styleUrls: ['./my-post-list.component.scss'],
})
export class MyPostListComponent {
  @Input() myPosts: MyPost[];
  @Input() showPostNumber: number;

  @Output() changeOrderBy = new EventEmitter<number>();
  @Output() changeFilterState = new EventEmitter<number>();
  @Output() edit = new EventEmitter<string>();
  @Output() changeTitleContains = new EventEmitter<string>();
  @Output() showMore = new EventEmitter<number>();
  @Output() showLess = new EventEmitter<number>();

  orderByItems: SelectItem[] = [
    new SelectItem(
      MyPostOrderByStatus.RecentlyCreated,
      'MYPOSTLIST.RECENTLYCREATED'
    ),
    new SelectItem(
      MyPostOrderByStatus.RecentlyPublished,
      'MYPOSTLIST.RECENTLYPUBLISHED'
    ),
  ];

  fltStates: SelectItem[] = [
    new SelectItem(MyPostStatus.AllState, 'MYPOSTLIST.ALLSTATE'),
    new SelectItem(MyPostStatus.Published, 'MYPOSTLIST.PUBLISHED'),
    new SelectItem(MyPostStatus.Draft, 'MYPOSTLIST.DRAFT'),
  ];

  constructor() {}

  public onChangeOrderBy(orderById: string) {
    this.changeOrderBy.emit(parseInt(orderById));
  }

  public onChangeFilterState(stateId: string) {
    this.changeFilterState.emit(parseInt(stateId));
  }

  public onEdit(postId: string) {
    this.edit.emit(postId);
  }

  public onChangeTitleContains(title: string) {
    this.changeTitleContains.emit(title);
  }

  public onShowMore() {
    this.showMore.emit(this.showPostNumber + 5);
  }

  public onShowLess() {
    this.showLess.emit(this.showPostNumber - 5);
  }
}
