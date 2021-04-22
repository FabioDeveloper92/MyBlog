import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentNumberTranslate'
})
export class CommentNumberTranslatePipe implements PipeTransform {

  transform(value: number): string {
   switch(value){
      case 0: return "GENERAL.NOCOMMENT";
      case 1: return "GENERAL.COMMENT";
      default: return "GENERAL.COMMENTS";
   }
  }

}
