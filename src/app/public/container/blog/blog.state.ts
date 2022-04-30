import { EntityState } from '@ngrx/entity/src/models';
import { VoiceMenu } from '../../../core/model/voice-menu.model';
import { ResumePost } from '../../models/resume-post.model';

export interface BlogState extends EntityState<ResumePost> {
  isPostList: boolean;
  orderByVisibilityVoices: VoiceMenu[];
  filterByTimeVoices: VoiceMenu[];
  selectVisibilityVoices: number;
  selectTimeVoices: number;
}
