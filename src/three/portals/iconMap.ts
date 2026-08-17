import type { ReactElement } from 'react';
import {
  StarsIcon,
  MemoriesIcon,
  MusicIcon,
  SurpriseIcon,
  QuestionsIcon,
  type IconProps,
} from './PortalIcons';

/**
 * Dünya kimliğini o dünyanın 3B nesnesine eşler.
 * Yeni bir dünya eklersen buraya da bir satır ekle.
 */
export const PORTAL_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  stars: StarsIcon,
  memories: MemoriesIcon,
  music: MusicIcon,
  surprise: SurpriseIcon,
  questions: QuestionsIcon,
};
