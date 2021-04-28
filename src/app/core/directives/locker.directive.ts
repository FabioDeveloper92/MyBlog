import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { LockerService } from '../services/locker.service';

class LockerChanges implements SimpleChanges {
  [propName: string]: SimpleChange;

  locker: SimpleChange;
}

@Directive({
  selector: '[locker]',
})
export class LockerDirective implements OnChanges, OnDestroy {
  @Input() locker: boolean;
  locked: boolean;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private lockerService: LockerService
  ) {}

  ngOnChanges(changes: LockerChanges) {
    if (changes.locker && changes.locker.currentValue === true) {
      this.locked = true;
      this.lockerService.Lock();
      this.renderer.addClass(this.elementRef.nativeElement, 'locked');
    } else {
      this.locked = false;

      this.lockerService.Unlock();
      this.renderer.removeClass(this.elementRef.nativeElement, 'locked');
    }
  }
  ngOnDestroy() {
    if (this.locked) {
      this.lockerService.Unlock();
    }
  }
}
