'use client';

import { track } from '@vercel/analytics';
import { throttle } from 'lodash-es';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Video from '@/components/video';
import { SEEK_TIME } from '@/lib/constants';
import { requestFullscreen } from '@/lib/video';
import { useUIStore } from '@/lib/stores/ui';

export interface VideoProps {
  likes: number;
  comments: number;
  shares: number;
  username: string;
  description: string;
  src: string;
  url: string;
  height: number;
  width: number;
  postUrl: string;
  posterUrl?: string;
  subreddit: string;
}

function VideoList({ videos }: { videos: VideoProps[] }) {
  const { muted, setMuted, paused, setPaused } = useUIStore();
  const [current, setCurrent] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [autoscroll, setAutoscroll] = useState(true);

  // fixes a bug when video paused while still scrolling, resumes on subsequent scroll event
  const roundedRef = useRef(current);
  const handleScroll = throttle(function (event: Event) {
    const newIndex = (event.target as HTMLElement).scrollTop / window.innerHeight;
    const rounded = Math.round(newIndex);

    // rounded sometimes skips a value due to overscrolling, limit it to one ahead of current
    const bounded = newIndex > current ? Math.min(current + 1, rounded) : Math.max(current - 1, rounded);

    setScrollIndex(bounded);

    if ((rounded == Math.round(newIndex + .5) || rounded == Math.round(newIndex - .5)) && rounded !== current && roundedRef.current !== rounded) {
      roundedRef.current = rounded;
      setCurrent(rounded);
      setPaused(false);
      track('scroll', { index: rounded });
    }
  }, 500, { leading: true, trailing: true })

  function handleEnded() {
    if (!autoscroll) return;

    document.body.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }

  useEffect(function () {
    document.body.addEventListener('scroll', handleScroll);

    return () => document.body.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  function handleVisibilitychange() {
    setVisible(!document.hidden);
  }

  useEffect(function() {
    window.addEventListener("visibilitychange", handleVisibilitychange);

    return () => window.removeEventListener('visibiliytChange', handleVisibilitychange)
  }, [])

  // scroll to the current video when the screen orientation changes
  const handleScreenorientationchange = useCallback(function handleScreenorientationchange() {
    setPaused(true);
    setTimeout(() => {
      document.querySelector('.playing')?.scrollIntoView();
      setPaused(false);
    }, 0)
  }, [])

  useEffect(function() {
    screen.orientation.addEventListener("change", handleScreenorientationchange);
    return () => screen.orientation.removeEventListener("change", handleScreenorientationchange);
  }, [handleScreenorientationchange])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Space') {
        event.preventDefault();
        setPaused(!paused);
      } 
      if (event.code === 'ArrowLeft') {
        event.preventDefault();

        const currentVideoEl:  HTMLVideoElement| null = document.querySelector('.playing video');
        
        if (!currentVideoEl) {
          return;
        }
        
        currentVideoEl.currentTime = Math.max(currentVideoEl.currentTime - SEEK_TIME,  0);
      }
      if (event.code === 'ArrowRight') {
        event.preventDefault();

        const currentVideoEl:  HTMLVideoElement| null = document.querySelector('.playing video');
        
        if (!currentVideoEl) {
          return;
        }
        
        currentVideoEl.currentTime = Math.min(currentVideoEl.currentTime + SEEK_TIME,  currentVideoEl.duration);
      }
      if (event.key === 'f') {
        event.preventDefault();
        const currentVideoEl:  HTMLVideoElement| null = document.querySelector('.playing video');

        if (!currentVideoEl) {
          return;
        }

        requestFullscreen(currentVideoEl);
      }
      if (event.key === 'j') {
        event.preventDefault();
        document.body.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
      if (event.key === 'k') {
        event.preventDefault();
        document.body.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      }
      if (event.key === 'm') {
        event.preventDefault();
        setMuted(!muted);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [muted, paused, setMuted, setPaused])

  function handleAutoscroll(autoscroll: boolean) {
    setAutoscroll(autoscroll);
  }

  return (
    <div className="h-dvh w-fill">
      {videos.map((video, index: number) => (
        <Video
          key={index}
          index={index}
          current={current}
          {...video}
          play={scrollIndex === index && !paused && visible}
          loadVideo={current === index || scrollIndex === index}
          onEnded={handleEnded}
          loop={!autoscroll}
          autoscroll={autoscroll}
          onAutoscrollToggle={handleAutoscroll}
          isFirst={index === 0}
          isLast={index === videos.length - 1}
        />
      ))}
    </div>
  );
}

export default React.memo(VideoList);
