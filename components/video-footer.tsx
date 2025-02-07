import { unescape } from 'lodash-es';
import React from "react";

import Link from "@/components/link";
import ExpandableParagraph from "@/components/expandable-paragraph";
// import { MdMusicNote } from 'react-icons/md';

interface VideoFooterProps {
  description: string;
  postUrl: string;
  subreddit: string;
  username: string;
}

function VideoFooter({ description, subreddit, username }: VideoFooterProps) {
  return (
    <div className="absolute bottom-0 left-0 p-2 lg:p-5 pr-20 lg:pr-5 lg:pb-8 max-w-lg text-white">
      <div className="space-y-1 lg:space-y-2">
        <h3 className='text-lg'>
          <Link href={`https://www.reddit.com/r/${subreddit}`} className='font-extrabold' target="_blank" rel="noreferrer">
            r/{subreddit}
          </Link>
          {' - '}
          <Link href={`https://www.reddit.com/u/${username}`} className='font-extrabold' target="_blank" rel="noreferrer">
            {username}
          </Link>
        </h3>
        <ExpandableParagraph clampClassName='line-clamp-2'>
            {unescape(description)}
        </ExpandableParagraph>
        {/* <div>
          <Link href={postUrl} className='font-extrabold' target="_blank" rel="noreferrer">
            source
          </Link>
        </div> */}
        {/* <div className="flex flex-row justify-between w-52">
          <MdMusicNote className='shrink-0 w-6 h-6'/>
          <div className='w-52 overflow-hidden'>
            <p className="animate-[moveMusicTitle_8s_infinite_linear]">
              <a href={postUrl} className='font-extrabold' target="_blank" rel="noreferrer">{postUrl}</a>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default React.memo(VideoFooter);
