import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryBlog'
})
export class CategoryBlogPipe implements PipeTransform {

  transform(value: number): string {
    switch(value){
      case 1: return "CATEGORY.BLOG.ANGULAR";
      default: return "GENERAL.UNDEFINED";
    }
  }

}
