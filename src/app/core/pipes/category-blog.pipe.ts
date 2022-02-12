import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryBlog'
})
export class CategoryBlogPipe implements PipeTransform {

  transform(value: number): string {
    switch(value){
      case 0: return "CATEGORY.BLOG.PROGRAMMING";
      case 1: return "CATEGORY.BLOG.ANGULAR";
      case 2: return "CATEGORY.BLOG.CSHARP";
      case 3: return "CATEGORY.BLOG.SQL";
      case 4: return "CATEGORY.BLOG.MONGODB";
      default: return "GENERAL.UNDEFINED";
    }
  }

}
