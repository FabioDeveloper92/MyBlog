import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VoiceMenu } from '../../../core/model/voice-menu.model';
import { selectVoiceMenu, selectVoiceMenuSelected } from './user-area.selector';
import { UserAreaState } from './user-area.state';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
})
export class UserAreaContainerComponent {
  voicesMenu$: Observable<VoiceMenu[]>;
  selectVoiceMenu$: Observable<number>;

  constructor(private store: Store<UserAreaState>) {
    this.voicesMenu$ = store.select(selectVoiceMenu);
    this.selectVoiceMenu$ = store.select(selectVoiceMenuSelected);
  }
}
