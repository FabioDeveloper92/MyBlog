import { VoiceMenu } from '../../core/model/voice-menu.model';

export const ORDER_BY_VISIBILITY_VOICES: VoiceMenu[] = [
  new VoiceMenu(1, 'ORDERVISIBILITY.RELEVANT'),
  new VoiceMenu(2, 'ORDERVISIBILITY.LATEST'),
  new VoiceMenu(3, 'ORDERVISIBILITY.TOP')
];
