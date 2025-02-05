'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

import VideoList  from '@/components/video-list';
import { useGetVideos } from '@/lib/api';
import { MdiAlert, MdiTelevisionOff, MingcuteLoadingFill } from './icons';
import { useSearchParams } from 'next/navigation';
import { Sort, SORTS } from '@/lib/types';

export default function VideoFeed({
  postId,
  subreddit,
  username
}: {
  postId?: string;
  subreddit?: string;
  username?: string;
}) {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get('sort');
  const sort: Sort = ((sortParam && (SORTS as readonly string[]).includes(sortParam)) ? sortParam : 'hot') as Sort;
  const { data: videos, error, isLoading } = useGetVideos({ postId, sort, subreddit, username });

  useEffect(() => {
    if (!error) return;

    track('error', { error: error?.message })
  }, [error]);

  return (
    isLoading ?
      <div className="grid place-items-center h-dvh w-fill">
        <div className='flex gap-2 items-center text-xl'>
          <MingcuteLoadingFill className='animate-spin' /> Loading
        </div>
      </div> :
    error ?
      <div className="grid place-items-center h-dvh w-fill">
      <div className='flex flex-col gap-4 items-center max-w-md'>
        <div className='flex gap-2 items-center text-xl'>
          <MdiAlert /> There was an error fetching videos :(
        </div>
      </div>
      </div> :
    videos?.length === 0 ?
      <div className="grid place-items-center h-dvh w-fill">
        <div className='flex gap-2 items-center text-xl'>
          <MdiTelevisionOff /> No videos found
        </div>
      </div> :
      videos && <VideoList videos={videos} />
  );
}