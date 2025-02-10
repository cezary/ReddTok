import { create } from 'zustand';

interface Dialog {
  title: string | undefined;
  description: React.ReactNode | string | undefined;
}

interface UIState {
  dialog?: Dialog;
  closeDialogCallback?: () => void;
  setDialog: (dialog: Dialog, closeDialogCallback?: () => void) => void;
  clearDialog: () => void;

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
  setDialog: (dialog, closeDialogCallback) => set({ dialog, closeDialogCallback }),
  clearDialog: () => set({ dialog: undefined }),

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