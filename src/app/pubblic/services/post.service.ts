import { Injectable } from '@angular/core';
import { append } from 'ramda';
import { Observable, of } from 'rxjs';
import { Comment } from '../models/comment.model';
import { PostDetail } from '../models/post-detail.model';
import { RelatedPost } from '../models/related-post.model';
import { ResumePost } from '../models/resume-post.model';

@Injectable()
export class PostService {
  constructor() {}

  list(): Observable<ResumePost[]> {
    let resumesPost: ResumePost[] = [];
    for (let i = 0; i < 5; i++) {
      let res: ResumePost = {
        id: '_' + i,
        title: 'myPost' + i,
        imageUrl:
          'https://baloo.az-theme.net/wp-content/uploads/2019/05/boxed-water-is-better-1463992-unsplash.jpg',
        category: 1,
        date: new Date(),
        commentNumber: i,
      };

      resumesPost = append(res, resumesPost);
    }

    return of(resumesPost);
  }

  get(id: string): Observable<PostDetail> {
    let tmpComment: Comment[] = [
      {
        id: '_0',
        author: 'anonymous',
        text: 'wow è bellissimo questo post',
        date: new Date(),
        authorThumb:
          'https://baloo.az-theme.net/wp-content/uploads/2019/05/valerie-elash-1252873-unsplash-570x524.jpg',
      },
      {
        id: '_3',
        author: 'anonymous',
        text: 'wow è bellissimo questo post',
        date: new Date(),
        authorThumb:
          'https://baloo.az-theme.net/wp-content/uploads/2019/05/valerie-elash-1252873-unsplash-570x524.jpg',
      },
      {
        id: '_3',
        author: 'anonymous2',
        text: 'stai fermo biiit',
        date: new Date(),
        authorThumb:
          'https://baloo.az-theme.net/wp-content/uploads/2019/05/valerie-elash-1252873-unsplash-570x524.jpg',
      },
    ];

    let resumesPost: RelatedPost[] = [];
    for (let i = 0; i < 3; i++) {
      let res: RelatedPost = {
        id: '_' + i,
        title: 'myPost' + i,
        imageUrl:
          'https://baloo.az-theme.net/wp-content/uploads/2019/05/boxed-water-is-better-1463992-unsplash.jpg',
        date: new Date(),
        createdBy: 'admin',
        summary:
          'sectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris…',
      };

      resumesPost = append(res, resumesPost);
    }

    let postDetail: PostDetail = {
      id: '_1',
      title: 'My First Post',
      category: 1,
      imageUrl:
        'https://baloo.az-theme.net/wp-content/uploads/2019/05/boxed-water-is-better-1463992-unsplash.jpg',
      date: new Date(),
      createdBy: 'admin',
      comments: tmpComment,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      postRelateds: resumesPost,
    };

    return of(postDetail);
  }
}
