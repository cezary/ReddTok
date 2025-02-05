'use client';

import React, { useEffect, useRef } from 'react';


function VideoListItem({ children, index, onFocus }: { children: React.ReactNode, index: number, onFocus: (index: number) => void }) {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [1]
    }

    const doThings = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          onFocus?.(index)
        }
      })
    }

    const observer = new IntersectionObserver(doThings, options)

    observer.observe(videoRef.current)

    const videoEl = videoRef.current;
    return () => observer.unobserve(videoEl);
  }, [index, onFocus]);

  return (
    <div ref={videoRef}>
      {children}
    </div>
  )
};

export default React.memo(VideoListItem);
