import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { NewPostComponent } from './component/new-post/new-post.component';
import { AddPostContainerComponent } from './container/add-post/add-post.component';
import { AddPostEffects } from './container/add-post/add-post.effects';
import { UpdatePostContainerComponent } from './container/update-post/update-post.component';
import { UpdatePostEffects } from './container/update-post/update-post.effect';
import { UserAreaContainerComponent } from './container/user-area/user-area.component';
import { UserReducers } from './user.reducers';
import { UserRoutes } from './user.routes';

@NgModule({
  declarations: [
    AddPostContainerComponent,
    NewPostComponent,
    UserAreaContainerComponent,
    UpdatePostContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    NgSelectModule,

    StoreModule.forFeature('user', UserReducers),
    EffectsModule.forFeature([AddPostEffects, UpdatePostEffects]),

    RouterModule.forChild(UserRoutes),

    CoreModule.forRoot(),
  ],
})
export class UserModule {}
