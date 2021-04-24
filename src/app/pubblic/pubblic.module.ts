import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { CommentFormComponent } from './component/comment-form/comment-form.component';
import { PostDetailComponent } from './component/post-detail/post-detail.component';
import { PostRelatedComponent } from './component/post-related/post-related.component';
import { ResumePostComponent } from './component/resume-post/resume-post.component';
import { HomeContainerComponent } from './container/home/home.component';
import { HomeEffects } from './container/home/home.effects';
import { PostReadContainerComponent } from './container/post-read/post-read.component';
import { PostReadEffects } from './container/post-read/post-read.effects';
import { PubblicReducers } from './pubblic.reducers';
import { PubblicRoutes } from './pubblic.routes';
import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    HomeContainerComponent,
    ResumePostComponent,
    PostReadContainerComponent,
    PostDetailComponent,
    PostRelatedComponent,
    CommentFormComponent,
  ],
  imports: [
    CommonModule,

    StoreModule.forFeature('pubblic', PubblicReducers),
    EffectsModule.forFeature([HomeEffects, PostReadEffects]),
    RouterModule.forChild(PubblicRoutes),

    CoreModule.forRoot(),
  ],
  providers: [PostService],
})
export class PubblicModule {}
