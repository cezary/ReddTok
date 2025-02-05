// import { Metadata } from 'next';

import VideoFeed from '@/components/video-feed';
import App from '@/components/app';

interface Props {
  params: Promise<{
    postId?: string;
    slug?: string;
    subreddit?: string;
    username?: string;
  }> 
}

// export async function generateMetadata(props: Props): Promise<Metadata> {
//   const params = await props.params;
//   return {
//     title: `${params.subreddit}`,
//     openGraph: {
//       title: `${params.subreddit} | ReddTok`,
//     },
//   };
// }

export default async function Home(props: Props) {
  const params = await props.params;

  return (
    <App>
      <VideoFeed {...params} />
    </App>
  )
}
