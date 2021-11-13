import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AddPostContainerComponent } from './container/add-post/add-post.component';
import { UserRoutes } from './user.routes';
import { NewPostComponent } from './component/new-post/new-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { UserReducers } from './user.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AddPostEffects } from './container/add-post/add-post.effects';

@NgModule({
  declarations: [AddPostContainerComponent, NewPostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    NgSelectModule,

    StoreModule.forFeature('user', UserReducers),
    EffectsModule.forFeature([AddPostEffects]),

    RouterModule.forChild(UserRoutes),

    CoreModule.forRoot(),
  ],
})
export class UserModule {}
