import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostDetail } from '../../models/post-detail.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent {
  @Input() postDetail: PostDetail;

  @Output() categoryClick = new EventEmitter<number>();
  @Output() postRelatedClick = new EventEmitter<string>();

  constructor() {}

  onCategoryClick(id: number) {
    this.categoryClick.emit(id);
  }

  onPostRelatedClick(id: string) {
    this.postRelatedClick.emit(id);
  }
}
