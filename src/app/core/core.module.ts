import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LockerService } from './services/locker.service';
import { DivBgImageDirective } from './directives/div-bg-image.directive';
import { CategoryBlogPipe } from './pipes/category-blog.pipe';
import { CommentNumberTranslatePipe } from './pipes/comment-number-translate.pipe';
import { LockerDirective } from './directives/locker.directive';
import { TagsService } from './services/tags.service';
import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    TopBarComponent,
    DivBgImageDirective,
    LockerDirective,
    CategoryBlogPipe,
    CommentNumberTranslatePipe,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  exports: [
    TopBarComponent,
    TranslateModule,
    DivBgImageDirective,
    LockerDirective,
    CategoryBlogPipe,
    CommentNumberTranslatePipe,
  ],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [LockerService, TagsService, PostService],
    };
  }
}
