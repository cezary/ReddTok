import React, { useCallback } from 'react';

import { HugeiconsBubbleChat, MaterialSymbolsLightFileSaveOutline, MdiChevronDown, MdiChevronUp, MdiLightHeart, MdiLightShare } from '@/components/icons';
import Link from "@/components/link";
import { cn, formatNumber } from '@/lib/utils';
import { useUIStore } from '@/lib/stores/ui';

interface VideoSideBarProps {
  description: string;
  likes: number;
  comments: number;
  shares: number;
  url: string;
  postUrl: string;
  isFirst: boolean;
  isLast: boolean;
}

function VideoSideBar({ comments, description, isFirst, isLast, likes, postUrl, url }: VideoSideBarProps) {
  const { setCommentDrawerOpen } = useUIStore();
  // const [isLike, setLike] = useState(false);

  const { pathname } = new URL(postUrl);
  const appUrl = `https://www.reddtok.vercel.app${pathname}`;

  const handleShareClick = useCallback(function handleShareClick() {
    if (!navigator.share) {
      return;
    }

    navigator.share({
      title: `reddtok: ${description}`,
      // text: description,
      url: appUrl
    });
  }, [appUrl, description]);

  const handleScrollDown = useCallback(function handleScrollDown() {
    document.body.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  const handleScrollUp = useCallback(function handleScrollUp() {
    document.body.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
  }, []);

  return (
    <>
      <section className='hidden lg:flex flex-col absolute top-1/2 translate-y-[-50%] right-0 text-white p-2 lg:p-5 space-y-2 lg:space-y-5'>
        <button className={cn('text-center', {
          'cursor-not-allowed opacity-30': isFirst
        })} onClick={handleScrollUp} title='Scroll up to previous video'>
          <MdiChevronUp className='inline-block size-12' />
        </button>
        <button className={cn('text-center', {
          'cursor-not-allowed opacity-30': isLast
        })} onClick={handleScrollDown} title='Scroll down to next video'>
          <MdiChevronDown className='inline-block size-12' />
        </button>
      </section>
      <section className="absolute bottom-0 right-0 text-white p-2 lg:p-5 space-y-2 lg:space-y-5">
        <div className="text-center">
          <MdiLightHeart className='inline-block size-10' />
          <p>{formatNumber(likes)}</p>
        </div>
        <div className="text-center">
          <Link href={url} target="_blank" rel="noreferrer">
            <HugeiconsBubbleChat className='inline-block text-3xl' />
            <p>{formatNumber(comments)}</p>
          </Link>
        </div>
        {false && 
        <div className="text-center" onClick={() => setCommentDrawerOpen(true)}>
          <HugeiconsBubbleChat className='inline-block text-3xl' />
          <p>{formatNumber(comments)}</p>
        </div>
        }
        {/* <div className="text-center cursor-pointer">
          <Link href={appUrl} target="_blank" rel="noreferrer">
            <MdLink className='inline-block text-4xl' />
            <p>Link</p>
          </Link>
        </div> */}
        <div className="text-center">
          <Link href={`https://rapidsave.com/info?url=${url}`} target="_blank" rel="noreferrer">
            <MaterialSymbolsLightFileSaveOutline className='inline-block text-3xl' />
            <p>Save</p>
          </Link>
        </div>
        <div className="text-center cursor-pointer" onClick={handleShareClick}>
          <MdiLightShare className='inline-block text-3xl' />
          <p>Share</p>
        </div>
        {/* <div className="text-center">
          <img
            className="relative h-12 w-12 invert animate-[spin_3s_linear_infinite]"
            src="https://firebasestorage.googleapis.com/v0/b/jornada2-eb156.appspot.com/o/vinil.png?alt=media&token=72a6362d-ca03-4b8b-975e-a4832fdeccff"
            alt="vinil girando"
          />
        </div> */}
      </section>
    </>
  );
}

export default React.memo(VideoSideBar);
