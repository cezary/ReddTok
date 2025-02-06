'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { track } from '@vercel/analytics';

import { MdiAlert, MdiTelevisionOff, MingcuteLoadingFill } from '@/components/icons';
import VideoList  from '@/components/video-list';
import { useGetVideos } from '@/lib/api';
import { formatGetVideosData } from '@/lib/format';
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
  const { data, error, isLoading, size, setSize, isValidating } = useGetVideos({ postId, sort, subreddit, username });
  const videos = formatGetVideosData(data);

  useEffect(() => {
    if (!error) return;

    track('error', { error: (error as Error).message, version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'unknown' })
  }, [error]);

  return (
    <>{
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
            <br/>
          </div>
          <div className='flex gap-2 items-center text-sm'>
            Reddit may be blocking the request, please try again later.
          </div>
        </div>
        </div> :
      videos?.length === 0 ?
        <div className="grid place-items-center h-dvh w-fill">
          <div className='flex gap-2 items-center text-xl'>
            <MdiTelevisionOff /> No videos found
            <br/>
          </div>
          <div className='flex gap-2 items-center text-sm'>
            Reddit may be rate limiting the request, please try again later.
          </div>
        </div> :
        videos && <VideoList videos={videos} loadMore={() => !isLoading && !isValidating && setSize(size + 1)} />
      }
    </>
  );
}