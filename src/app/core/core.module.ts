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

@NgModule({
  declarations: [
    TopBarComponent,
    DivBgImageDirective,
    CategoryBlogPipe,
    CommentNumberTranslatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    TopBarComponent,
    TranslateModule,
    DivBgImageDirective,
    CategoryBlogPipe,
    CommentNumberTranslatePipe
  ],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [LockerService],
    };
  }
}
