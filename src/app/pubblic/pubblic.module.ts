import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { CommentFormComponent } from './component/comment-form/comment-form.component';
import { CommentViewComponent } from './component/comment-view/comment-view.component';
import { PostDetailComponent } from './component/post-detail/post-detail.component';
import { PostRelatedComponent } from './component/post-related/post-related.component';
import { ResumePostComponent } from './component/resume-post/resume-post.component';
import { BlogContainerComponent } from './container/blog/blog.component';
import { BlogEffects } from './container/blog/blog.effect';
import { HomeContainerComponent } from './container/home/home.component';
import { HomeEffects } from './container/home/home.effects';
import { PostReadContainerComponent } from './container/post-read/post-read.component';
import { PostReadEffects } from './container/post-read/post-read.effects';
import { PubblicReducers } from './pubblic.reducers';
import { PubblicRoutes } from './pubblic.routes';

@NgModule({
  declarations: [
    HomeContainerComponent,
    ResumePostComponent,
    PostReadContainerComponent,
    PostDetailComponent,
    PostRelatedComponent,
    CommentFormComponent,
    CommentViewComponent,
    BlogContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    StoreModule.forFeature('pubblic', PubblicReducers),
    EffectsModule.forFeature([HomeEffects, PostReadEffects, BlogEffects]),
    RouterModule.forChild(PubblicRoutes),

    CoreModule.forRoot(),
  ]
})
export class PubblicModule {}
