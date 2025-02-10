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

  autoscroll: boolean;
  setAutoscroll: (autoscroll: boolean) => void;

  isCommentDrawerOpen: boolean;
  setCommentDrawerOpen: (isCommentDrawerOpen: boolean) => void;

  muted: boolean;
  setMuted: (muted: boolean) => void;

  paused: boolean;
  setPaused: (paused: boolean) => void;

  live: boolean;
  setLive: (live: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  alertDescription: undefined,
  setAlert: (alert, closeAlertCallback) => set({ alert, closeAlertCallback }),
  clearAlert: () => set({ alert: undefined }),

  autoscroll: true,
  setAutoscroll: (autoscroll: boolean) => set({ autoscroll }),

  isCommentDrawerOpen: false,
  setCommentDrawerOpen: (isCommentDrawerOpen: boolean) => set({ isCommentDrawerOpen }),

  muted: true,
  setMuted: (muted: boolean) => set({ muted }),

  paused: false,
  setPaused: (paused: boolean) => set({ paused }),

  live: false,
  setLive: (live: boolean) => set({ live }),
}))