import { create } from 'zustand';

interface Alert {
  title: string | undefined;
  description: React.ReactNode | string | undefined;
}
interface UIState {
  alert?: Alert;
  closeAlertCallback?: () => void;
  setAlert: (alert: Alert, closeAlertCallback?: () => void) => void;
  clearAlert: () => void;
  isCommentDrawerOpen: boolean;
  setCommentDrawerOpen: (isCommentDrawerOpen: boolean) => void;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  alertDescription: undefined,
  setAlert: (alert, closeAlertCallback) => set({ alert, closeAlertCallback }),
  clearAlert: () => set({ alert: undefined }),

  isCommentDrawerOpen: false,
  setCommentDrawerOpen: (isCommentDrawerOpen: boolean) => set({ isCommentDrawerOpen }),

  muted: true,
  setMuted: (muted: boolean) => set({ muted }),

  paused: false,
  setPaused: (paused: boolean) => set({ paused }),
}))