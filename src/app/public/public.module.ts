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
import { PublicReducers } from './public.reducers';
import { PublicRoutes } from './public.routes';
import { TabFilterComponent } from './component/tab-filter/tab-filter.component';

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
    TabFilterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    StoreModule.forFeature('Public', PublicReducers),
    EffectsModule.forFeature([HomeEffects, PostReadEffects, BlogEffects]),
    RouterModule.forChild(PublicRoutes),

    CoreModule.forRoot(),
  ]
})
export class PublicModule {}
