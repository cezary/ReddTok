import { unescape } from 'lodash-es';

import { RedditPostListing } from '@/lib/types';


export function formatGetVideosData(data: (RedditPostListing | RedditPostListing[])[] | undefined) {
  const videoTitleSet = new Set<string>();
  const videoUrlSet = new Set<string>();

  function formatRedditPostListings(json: RedditPostListing | RedditPostListing[]) {
    const videosList = (Array.isArray(json) ? json[0] : json).data.children
      .map(c => c.data)
      // remove posts with no video url or deleted author
      .filter(d => !d.subreddit.startsWith('u_'))
      // remove deleted posts
      .filter(d => (d.media?.reddit_video?.hls_url || d.preview?.reddit_video_preview?.hls_url) && d.author !== '[deleted]')
      // remove duplicate videos by filtering posts with same author and title
      .filter(d => {
        const videoTitleKey = `${d.author}:${d.title.trim()}`;
        if (videoTitleSet.has(videoTitleKey) || videoUrlSet.has(d.url)) {
          return false;
        }

        videoTitleSet.add(videoTitleKey);
        videoUrlSet.add(d.url);
        return true;
      })
      .map(d => ({
        id: d.id,
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

  return (data?.map(json => formatRedditPostListings(json)).flat() || []);
}
