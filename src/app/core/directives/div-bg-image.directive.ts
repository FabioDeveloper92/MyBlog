import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appDivBgImage]',
})
export class DivBgImageDirective implements OnChanges {
  @Input() imageUrl: string;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges() {
    this.elementRef.nativeElement.style.backgroundImage = "url('"+this.imageUrl+"')";
  }
}
