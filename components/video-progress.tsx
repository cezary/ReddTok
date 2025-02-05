import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/stores/ui";

interface VideoProgressProps {
  current: number;
  playerRef: React.RefObject<HTMLVideoElement | null>;
}

function VideoProgress({ current, playerRef, }: VideoProgressProps) {
  const { setPaused } = useUIStore();
  const progressRef = useRef<HTMLDivElement>(null);

  // set up event handlers to sync progress bar with video
  useEffect(() => {
    const playerRefCurrent = playerRef.current;
    const progressRefCurrent = progressRef.current;

    if (!playerRefCurrent || !progressRefCurrent) {
      return;
    }

    function onTimeUpdate() {
      if (!playerRefCurrent || !progressRefCurrent) {
        return;
      }
      const currentTime = playerRef.current?.currentTime;
      const duration = playerRef.current?.duration;

      if (currentTime && duration && duration > 0) {
        const progress = Math.round((currentTime / duration) * 100);
        progressRefCurrent.style.setProperty('--progress', `${progress/100}`);
      }
    }

    playerRefCurrent.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      playerRefCurrent?.removeEventListener('timeupdate', onTimeUpdate);
    }
  }, [current, playerRef])

  // set progress to 0 when current changes
  useEffect(() => {
    progressRef.current?.style.setProperty('--progress', '0');
  }, [current])

  function handleProgressMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (!playerRef.current) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const progress = (e.nativeEvent.clientX - rect.left) / (e.currentTarget as HTMLDivElement).clientWidth;
    playerRef.current.currentTime = progress * playerRef.current.duration;
    playerRef.current.pause();
    setPaused(true);
  }

  function handleProgressMouseUp(e: React.MouseEvent<HTMLDivElement>) {
    if (!playerRef.current) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const progress = (e.nativeEvent.clientX - rect.left) / (e.currentTarget as HTMLDivElement).clientWidth;
    playerRef.current.currentTime = progress * playerRef.current.duration;
    playerRef.current.play();
    setPaused(false);
  }

  // sets initial progress to 0, otherwise flashes on load
  const style = { "--progress": 0 } as React.CSSProperties;

  return (
    <div className={cn(
      'absolute bottom-0 left-0 right-0 w-full h-3 cursor-pointer group/progress',
      'lg:opacity-0 lg:group-hover/video:opacity-100 transition duration-150 ease-in-out',
    )}
      onMouseDown={handleProgressMouseDown}
      onMouseUp={handleProgressMouseUp}
    >
      <div className='absolute bottom-0 left-0 right-0 w-full h-1 group-hover/progress:h-2 transform duration-0 ease-in-out origin-left bg-black/60' />
      <div
        className='absolute bottom-0 left-0 w-full h-1 group-hover/progress:h-2 scale-x-[--progress] transform duration-0 ease-in-out origin-left bg-white'
        style={style}
        ref={progressRef}
      />
    </div>
  );
}

export default React.memo(VideoProgress);