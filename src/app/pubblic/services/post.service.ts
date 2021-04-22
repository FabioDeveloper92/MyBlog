import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResumePost } from '../models/resume-post.model';
import { append } from 'ramda';


@Injectable()
export class PostService {
  constructor() { }

  list(): Observable<ResumePost[]> {
    let resumesPost: ResumePost[] = [];
    for (let i = 0; i < 5; i++) {
      let res: ResumePost = {
        id: '_' + i,
        title: 'myPost' + i,
        imageUrl: 'https://baloo.az-theme.net/wp-content/uploads/2019/05/boxed-water-is-better-1463992-unsplash.jpg',
        category: 1,
        date: new Date(),
        commentNumber: i
      };

      resumesPost = append(res, resumesPost);
    }
    
    return of(resumesPost);
  }
}
