import { track } from '@vercel/analytics';
import fetchJsonp from 'fetch-jsonp';
import useSWRInfinite from 'swr/infinite'

import { DEFAULT_SUBREDDITS } from '@/lib/constants';
import { RedditPostListing, Sort } from '@/lib/types';

export const useGetVideos = ({
  postId,
  sort='hot',
  subreddit,
  username,
}: {
  postId?: string;
  sort?: Sort;
  subreddit?: string;
  username?: string;
}) => {
  const limit = 5;
  const query = `site:v.redd.it+OR+site:redgifs`.replaceAll(':', '%3A');
  const showNsfw = true;

  
  function getKey(pageIndex: number, previousPageData: RedditPostListing | undefined) {
    const after = previousPageData?.data?.children?.at(-1)?.data?.id;
    
    let path;
    let url;
    if (postId) {
      url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`
    } else {
      if (username) {
        path = `/user/${username}/submitted`;
      } else if (subreddit) {
        path = `/r/${subreddit}`;
      } else {
        subreddit = DEFAULT_SUBREDDITS.join('%2B');
        path = `/r/${subreddit}`;
      }
      url = `https://www.reddit.com${path}/search/.json?q=${query}&${after ? 'after=t3_'+after+'&' : ''}include_over_18=${showNsfw ? 'on' : 'off'}&restrict_sr=on&sort=${sort}&limit=${limit}`
    }

    return url
  }

  async function fetcher(url: string) {
    try {
      const res = await fetchJsonp(url+`&_=${Date.now()}`, { jsonpCallback: 'jsonp'});
      const json: RedditPostListing | RedditPostListing[] = await res.json()
      return json;
    } catch (error) {
      track('error', { error: (error as Error).message, version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'unknown' })
      throw error;
    }
  }

  return useSWRInfinite((pageIndex, previousData) => getKey(pageIndex, previousData), fetcher, {
    revalidateFirstPage: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
};
