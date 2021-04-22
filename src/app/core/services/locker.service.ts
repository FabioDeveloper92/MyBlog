import { Injectable } from '@angular/core';
import * as NProgress from 'nprogress';

@Injectable()
export class LockerService {

  constructor() { }

  private countLock = 0;

  Lock(): void {
    if (this.countLock === 0) {
      NProgress.start();
    }

    this.countLock++;
  }

  Unlock(): void {
    this.countLock--;

    if (this.countLock <= 0) {
      this.countLock = 0;
      NProgress.done();
    }
  }

}
