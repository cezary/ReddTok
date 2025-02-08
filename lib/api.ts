import { track } from '@vercel/analytics';
import useSWRInfinite from 'swr/infinite'

import { DEFAULT_SUBREDDITS } from '@/lib/constants';
import { RedditPostListing, Sort } from '@/lib/types';

function updateSearchParams(urlString: string, queryParams: Record<string, number | string | undefined>) {
  const url = new URL(urlString)
  const entries = [...url.searchParams.entries(), ...Object.entries(queryParams)]
    .filter(([, v]) => v !== undefined) as [string, string][];
  const searchParams = Object.fromEntries(entries);

  url.search = new URLSearchParams(searchParams).toString().replaceAll('%2B', '+').replaceAll('%3A', ':');
  return url.toString();
}

class RedditError extends Error {
  info?: object;
  status?: number;
}

export const useGetVideos = ({
  live,
  postId,
  sort='hot',
  subreddit,
  username,
}: {
  live?: boolean;
  postId?: string;
  sort?: Sort;
  subreddit?: string;
  username?: string;
}) => {
  const limit = 5;
  const query = `site:v.redd.it+OR+site:redgifs`;
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
        if (!live) {
          return `/api/${sort}.json`;
        }

        subreddit = DEFAULT_SUBREDDITS.join('%2B');
        path = `/r/${subreddit}`;
      }
      url = updateSearchParams(`https://www.reddit.com${path}/search/.json`, {
        q: query,
        after: after ? `t3_${after}` : undefined,
        include_over_18: showNsfw ? 'on' : 'off',
        restrict_sr: 'on',
        sort,
        limit,
      });
    }

    return url
  }

  async function fetcher(url: string) {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        const error = new RedditError('An error occurred while fetching the data.')
        // Attach extra info to the error object.
        error.info = await res.json()
        error.status = res.status
        throw error
      }

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
