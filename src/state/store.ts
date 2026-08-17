import { useSyncExternalStore } from 'react';

export type Stage =
  | 'loading'
  | 'gate'        // şifre ekranı
  | 'breach'      // şifre doğru — geçiş animasyonu
  | 'hub'         // ana evren
  | 'travel'      // bir dünyaya yolculuk
  | 'questions'   // soru odası
  | 'finale';     // kapanış

export interface Answer {
  question: string;
  answer: string;
  at: number;
}

interface AppState {
  stage: Stage;
  /** Yükleme yüzdesi 0–100 */
  progress: number;
  /** Şu an odaklanılan dünya kimliği */
  focused: string | null;
  /** Yolculuk yapılan dünya kimliği */
  traveling: string | null;
  /** Verilen cevaplar */
  answers: Answer[];
  muted: boolean;
  /** Kullanıcı ses açma kararı verdi mi */
  audioTouched: boolean;
}

const STORAGE_KEY = 'ey-universe-answers';

function loadAnswers(): Answer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Answer[]) : [];
  } catch {
    return [];
  }
}

let state: AppState = {
  stage: 'loading',
  progress: 0,
  focused: null,
  traveling: null,
  answers: loadAnswers(),
  muted: true,
  audioTouched: false,
};

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function set(patch: Partial<AppState>) {
  state = { ...state, ...patch };
  emit();
}

export const store = {
  get: () => state,
  set,
  setStage: (stage: Stage) => set({ stage }),
  setProgress: (progress: number) => set({ progress: Math.min(100, Math.max(0, progress)) }),
  focus: (focused: string | null) => {
    if (state.focused !== focused) set({ focused });
  },
  travel: (traveling: string | null) => set({ traveling, stage: traveling ? 'travel' : 'hub' }),
  addAnswer: (question: string, answer: string) => {
    const answers = [...state.answers, { question, answer, at: Date.now() }];
    set({ answers });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* depolama kapalı olabilir */
    }
  },
  clearAnswers: () => {
    set({ answers: [] });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* yoksay */
    }
  },
  setMuted: (muted: boolean) => set({ muted, audioTouched: true }),
};

export function useApp<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  );
}
