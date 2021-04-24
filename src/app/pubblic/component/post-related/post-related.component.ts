import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResumePost } from '../../models/resume-post.model';

@Component({
  selector: 'app-post-related',
  templateUrl: './post-related.component.html',
  styleUrls: ['./post-related.component.scss'],
})
export class PostRelatedComponent {
  @Input() postRelated: ResumePost;
  @Output() postClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  public onPostClick(id:string){
    this.postClick.emit(id);
  }
}
