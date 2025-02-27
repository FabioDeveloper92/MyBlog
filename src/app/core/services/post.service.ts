import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostComment } from '../../public/models/post-comment.model';
import { PostDetail } from '../../public/models/post-detail.model';
import { PostsFilter } from '../../public/models/posts-filter.model';
import { ResumePost } from '../../public/models/resume-post.model';
import { ConfigService } from '../../services/config.service';
import { AddPost } from '../../user/models/add-post.model';
import { MyPostCanBeRelated } from '../../user/models/my-post-can-be-related';
import { MyPostFilter } from '../../user/models/my-post-filter.model';
import { MyPost } from '../../user/models/my-post.model';
import { UpdatePost } from '../../user/models/update-post.model';

@Injectable()
export class PostService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  listOverview(postFilter: PostsFilter): Observable<ResumePost[]> {
    return this.http.post<ResumePost[]>(
      this.configService.buildApiUrl('api/postoverview'),
      postFilter
    );
  }

  get(id: string): Observable<PostDetail> {
    return this.http.get<PostDetail>(
      this.configService.buildApiUrl('api/post/' + id)
    );
  }

  addComment(comment: PostComment): Observable<void> {
    return this.http.post<void>(
      this.configService.buildApiUrl('api/postcomment'),
      comment,
      { responseType: 'text' as 'json' }
    );
  }

  addPost(addPost: AddPost): Observable<string> {
    return this.http.post<string>(
      this.configService.buildApiUrl('api/postcreate'),
      addPost,
      { responseType: 'text' as 'json' }
    );
  }

  updatePost(id: string, addPost: AddPost): Observable<string> {
    return this.http.put<string>(
      this.configService.buildApiUrl('api/postupdate/' + id),
      addPost,
      { responseType: 'text' as 'json' }
    );
  }

  getUpdatePost(id: string): Observable<UpdatePost> {
    return this.http.get<UpdatePost>(
      this.configService.buildApiUrl('api/postupdate/' + id)
    );
  }

  getMyPostCanBeRelated(): Observable<MyPostCanBeRelated[]> {
    return this.http.get<MyPostCanBeRelated[]>(
      this.configService.buildApiUrl('api/postrelated/')
    );
  }

  getPosts(filterMyPost: MyPostFilter): Observable<MyPost[]> {
    return this.http.post<MyPost[]>(
      this.configService.buildApiUrl('api/mypost'),
      filterMyPost
    );
  }
}
