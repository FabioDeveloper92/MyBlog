import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResumePost } from '../../models/resume-post.model';

@Component({
  selector: 'app-resume-post',
  templateUrl: './resume-post.component.html',
  styleUrls: ['./resume-post.component.scss'],
})
export class ResumePostComponent {
  @Input() resumePost: ResumePost;

  @Output() postClick = new EventEmitter<string>();
  @Output() categoryClick = new EventEmitter<number>();

  constructor() {}

  onPostClick(id: string) {
    this.postClick.emit(id);
  }

  onCategoryClick(id: number) {
    this.categoryClick.emit(id);
  }
}
