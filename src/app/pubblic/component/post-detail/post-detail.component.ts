import { Component, Input, OnInit } from '@angular/core';
import { PostDetail } from '../../models/post-detail.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  @Input() postDetail: PostDetail;

  constructor() { }

  ngOnInit(): void {
  }

}
