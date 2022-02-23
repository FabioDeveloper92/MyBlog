import { VoiceMenu } from '../../../core/model/voice-menu.model';
import { UpdatePost } from '../../models/update-post.model';

export interface UserAreaState {
  voiceMenu: VoiceMenu[];
  voiceMenuSelected: number;
  posts: UpdatePost[];
  isBusyGetPosts: boolean;
}
