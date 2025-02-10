/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useRef, useEffect } from 'react';

import HlsPlayer from '@/components/hls-player';
import VideoButtons from '@/components/video-buttons';
import VideoFooter from '@/components/video-footer';
import VideoProgress from '@/components/video-progress';
import VideoSideBar from '@/components/video-sidebar';
import { useUIStore } from '@/lib/stores/ui';
import { cn } from '@/lib/utils';

interface VideoProps {
  index: number;
  current: number;
  likes: number;
  comments: number;
  shares: number;
  username: string;
  description: string;
  src: string;
  height: number;
  width: number;
  url: string;
  posterUrl?: string;
  play: boolean;
  loadVideo: boolean;
  // paused: boolean;
  // onPause: (paused?: boolean) => void;
  onEnded: () => void;
  postUrl: string;
  subreddit: string;
  loop: boolean;
  isFirst: boolean;
  isLast: boolean;
}

function Video(props: VideoProps) {
  const { paused, setPaused } = useUIStore();

  const playerRef = useRef<HTMLVideoElement>(null);
  const { muted } = useUIStore();

  // HLS.js automatically downloads everything: https://github.com/video-dev/hls.js/issues/2671#issuecomment-1817744160
  // const hlsConfig = useRef<Partial<HlsConfig>>({startLevel: 3, maxBufferLength: 20, maxBufferSize: 8 * 1000 * 1000, backBufferLength: 6, autoStartLoad: true, defaultAudioCodec: 'mp4a.40.2' });

  function handleMouseDown(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey) {
      // using anchor tag allows opening videos in new tabs by metaKey+clicking on them
      return;
    }

    // normal clicks on the video element should play/pause the video
    e.preventDefault();

    // only handle clicks on the video, container and not on the controls
    if (e.target !== playerRef.current) {
      return;
    }

    // props.onPause(!props.paused);
    setPaused(!paused);

    return;
  }

  useEffect(() => {
    if (!playerRef.current) {
      return;
    }

    if (!props.play) {
      playerRef.current.pause();
      return;
    }

    if (!props.play) {
      return;
    }

    const playerEl = playerRef.current;

    playerEl.addEventListener('onended', props.onEnded);
    if (playerRef.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ) {
      playerEl.play();
    } else {
      function handleLoaddata() {
        if (playerEl.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          playerEl?.play();
        }
      }
      playerEl.addEventListener("loadeddata", handleLoaddata, { once: true });

      return () => {
        playerEl.removeEventListener("loadeddata", handleLoaddata);
      }
    }
  }, [props]);

  useEffect(() => {
    if (!playerRef.current || playerRef.current.currentTime === 0) {
      return;
    }

    // reset last video when index changes
    if (props.current !== props.index) {
      playerRef!.current!.currentTime = 0;
      return;
    }

  }, [props]);

  // helps video player load first frame of video
  const src = `${props.url}#t=0.1`;

  return (
    <div
      className={cn("relative h-dvh snap-start snap-always grid place-items-center", {
        'playing': props.play,
      })}
    >
      <a
        href={props.src}
        className="relative rounded-xl overflow-hidden group/video"
        onClick={handleMouseDown}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={props.posterUrl || 'noise.gif'}
          className="h-svh w-svw mx-auto p-px object-contain cursor-pointer"
          alt="poster"
          height={props.height}
          width={props.width}
          loading="lazy"
        />
        {props.loadVideo ? (
          <HlsPlayer
            className="absolute inset-0 h-svh w-svw mx-auto object-contain cursor-pointer"
            loop={props.loop}
            autoPlay={false}
            muted={muted}
            playsInline
            preload='auto'
            src={src as string}
            poster={props.posterUrl || 'noise.gif'}
            playerRef={playerRef}
            height={props.height}
            width={props.width}
            onEnded={props.onEnded}
          />
        ) : null}
        <VideoButtons />
        <VideoProgress
          current={props.current}
          playerRef={playerRef}
        />
      </a>
      <VideoFooter
        description={props.description}
        postUrl={props.postUrl}
        subreddit={props.subreddit}
        username={props.username}
      />
      <VideoSideBar
        description={props.description}
        likes={props.likes}
        comments={props.comments}
        shares={props.shares}
        url={props.src}
        postUrl={props.postUrl}
        isFirst={props.isFirst}
        isLast={props.isLast}
      />
    </div>
  );
}

export default React.memo(Video);
