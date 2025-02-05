export function requestFullscreen(videoEl: HTMLVideoElement & { webkitEnterFullscreen?: () => void }) {
  if (videoEl.requestFullscreen) {
    videoEl.requestFullscreen?.();
  } else if (videoEl.webkitEnterFullscreen) {
    (videoEl as HTMLVideoElement & { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen?.();
    // HACK restart video after fullscreen: https://stackoverflow.com/a/41810356
    videoEl.addEventListener('webkitendfullscreen', () => setTimeout(() => videoEl.play(), 300), { once: true });
  }
}

export function requestPictureInPicture(videoEl: HTMLVideoElement & { webkitEnterFullscreen?: () => void }) {
  if (!videoEl.requestPictureInPicture) {
    return;
  }

  videoEl.requestPictureInPicture();
}