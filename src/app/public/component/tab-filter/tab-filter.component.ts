import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VoiceMenu } from '../../../core/model/voice-menu.model';

@Component({
  selector: 'app-tab-filter',
  templateUrl: './tab-filter.component.html',
})
export class TabFilterComponent {
  @Input() items: VoiceMenu[];
  @Input() isRight: boolean;
  @Input() selectId: number;

  @Output() selectedClick = new EventEmitter<number>();

  constructor() {}

  onSelected(id: number) {
    this.selectedClick.emit(id);
  }
}
