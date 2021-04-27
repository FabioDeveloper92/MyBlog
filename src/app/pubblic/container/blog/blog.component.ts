import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ResumePost } from '../../models/resume-post.model';
import { BlogState } from '../blog/blog.state';
import { selectAll } from '../blog/blog.selectors';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogContainerComponent implements OnInit {
  resumesPost$: Observable<ResumePost[]>;

  constructor(private store: Store<BlogState>) {
    this.resumesPost$ = this.store.select(selectAll);
  }

  ngOnInit(): void {
  }

}
