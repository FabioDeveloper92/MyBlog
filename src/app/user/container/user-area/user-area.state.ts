import { VoiceMenu } from '../../../core/model/voice-menu.model';
import { MyPost } from '../../models/my-post.model';

export interface UserAreaState {
  voiceMenu: VoiceMenu[];
  voiceMenuSelected: number;
  posts: MyPost[];
  isBusyGetPosts: boolean;
  filterByTitleContains: string;
  filterByState: number;
  orderByDate: number;
  showPostLimit: number;
}
