import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HomeContainerComponent } from './container/home/home.component';
import { PubblicReducers } from './pubblic.reducers';
import { PubblicRoutes } from './pubblic.routes';
import { ResumePostComponent } from './component/resume-post/resume-post.component';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '@angular/common';
import { PostService } from './services/post.service';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './container/home/home.effects';
import { PostReadContainerComponent } from './container/post-read/post-read.component';
import { PostDetailComponent } from './component/post-detail/post-detail.component';
import { PostRelatedComponent } from './component/post-related/post-related.component';
import { CommentFormComponent } from './component/comment-form/comment-form.component';

@NgModule({
  declarations: [HomeContainerComponent, ResumePostComponent, PostReadContainerComponent, PostDetailComponent, PostRelatedComponent, CommentFormComponent],
  imports: [
    CommonModule,

    StoreModule.forFeature('pubblic', PubblicReducers),
    EffectsModule.forFeature([HomeEffects]),
    RouterModule.forChild(PubblicRoutes),

    CoreModule.forRoot()
  ],
  providers: [PostService],
})
export class PubblicModule {}
