import { Component, Input } from '@angular/core';
import { VoiceMenu } from '../../model/voice-menu.model';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
})
export class LateralMenuComponent {
  @Input() voicesMenu: VoiceMenu[];
  @Input() selectVoiceMenu: number;

  constructor() {}
}
