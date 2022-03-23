import { Component, EventEmitter, Input, Output } from '@angular/core';
import { postsRelatedCompleted } from '../../models/related-post.model';

@Component({
  selector: 'app-post-related',
  templateUrl: './post-related.component.html',
  styleUrls: ['./post-related.component.scss'],
})
export class PostRelatedComponent {
  @Input() postRelated: postsRelatedCompleted;
  @Output() postClick = new EventEmitter<string>();

  constructor() {}

  public onPostClick(id: string) {
    this.postClick.emit(id);
  }
  
}
