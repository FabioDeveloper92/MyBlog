import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../../public/models/comment.model';
import { PostDetail } from '../../public/models/post-detail.model';
import { ResumePost } from '../../public/models/resume-post.model';
import { ConfigService } from '../../services/config.service';
import { AddPost } from '../../user/models/add-post.model';
import { UpdatePost } from '../../user/models/update-post.model';

@Injectable()
export class PostService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  list(limit: number): Observable<ResumePost[]> {
    return this.http.get<ResumePost[]>(
      this.configService.buildApiUrl('api/postoverview/' + limit)
    );
  }

  get(id: string): Observable<PostDetail> {
    return this.http.get<PostDetail>(
      this.configService.buildApiUrl('api/post/' + id)
    );
  }

  addComment(comment: Comment): Observable<void> {
    console.log(comment);
    return of();
  }

  addPost(addPost: AddPost): Observable<string> {
    return this.http.post<string>(
      this.configService.buildApiUrl('api/post'),
      addPost,
      { responseType: 'text' as 'json' }
    );
  }

  updatePost(addPost: AddPost): Observable<string> {
    return this.http.post<string>(
      this.configService.buildApiUrl('api/postupdate'),
      addPost,
      { responseType: 'text' as 'json' }
    );
  }

  getUpdatePost(id: string): Observable<UpdatePost> {
    return this.http.get<UpdatePost>(
      this.configService.buildApiUrl('api/postupdate/' + id)
    );
  }
}
