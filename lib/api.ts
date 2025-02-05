import { track } from '@vercel/analytics';
import { unescape } from 'lodash-es';
import fetchJsonp from 'fetch-jsonp';
import useSwr from 'swr';

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
  const limit = 30;
  const query = `site:v.redd.it+OR+site:redgifs`.replaceAll(':', '%3A');
  const showNsfw = true;

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
    url = `https://www.reddit.com${path}/search/.json?q=${query}&include_over_18=${showNsfw ? 'on' : 'off'}&restrict_sr=on&sort=${sort}&limit=${limit}`
  }

  async function fetcher(url: string) {
    let json: RedditPostListing | RedditPostListing[];
    try {
      const res = await fetchJsonp(url+`&_=${Date.now()}`, { jsonpCallback: 'jsonp'});

      json = await res.json()
    } catch (error) {
      track('error', { error: (error as Error).message })
      throw error;
    }
  
    const videoTitleSet = new Set<string>();
    const videoUrlSet = new Set<string>();
    const videosList = (Array.isArray(json) ? json[0] : json).data.children
      .map(c => c.data)
      // remove posts with no video url or deleted author
      .filter(d => !d.subreddit.startsWith('u_'))
      // remove deleted posts
      .filter(d => (d.media?.reddit_video?.hls_url || d.preview?.reddit_video_preview?.hls_url) && d.author !== '[deleted]')
      // remove duplicate videos by filtering posts with same author and title
      .filter(d => {
        const videoTitleKey = `${d.author}:${d.title.trim()}`;
  
        if (videoTitleSet.has(videoTitleKey)) {
          return false;
        }
        if (videoUrlSet.has(d.url)) {
          return false;
        }
  
        videoTitleSet.add(videoTitleKey);
        videoUrlSet.add(d.url);
        return true;
      })
      .map(d => ({
        likes: d.score,
        comments: d.num_comments,
        shares: d.num_comments,
        username: d.author,
        description: unescape(d.title)!,
        src: `https://www.reddit.com${d.permalink}`,
        postUrl: `https://www.reddit.com${d.permalink}`,
        posterUrl: unescape(d.preview?.images[0]?.resolutions.at(-1)?.url),
        subreddit: d.subreddit,
        url: unescape(d.media?.reddit_video?.hls_url || d.preview?.reddit_video_preview?.hls_url) || '/noise.gif',
        height: d.media?.reddit_video?.height || d.preview?.reddit_video_preview?.height || 480,
        width: d.media?.reddit_video?.width || d.preview?.reddit_video_preview?.width || 640,
      }))
      .filter(d => !!d.url)
  
    return videosList
  }

  return useSwr(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
};
