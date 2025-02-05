'use client';

import VideoList  from '@/components/video-list';
import { useGetVideos } from '@/lib/api';
import { MdiTelevisionOff, MingcuteLoadingFill } from './icons';
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
  const { data: videos, isLoading } = useGetVideos({ postId, sort, subreddit, username });

  return (
    isLoading ?
      <div className="grid place-items-center h-dvh w-fill">
        <div className='flex gap-2 items-center text-xl'>
          <MingcuteLoadingFill className='animate-spin' /> Loading
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