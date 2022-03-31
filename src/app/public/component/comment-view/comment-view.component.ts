import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
})
export class CommentViewComponent implements OnInit {
  @Input() comments: Comment[];

  constructor() {}

  ngOnInit(): void {}
}
