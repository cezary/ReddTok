import { Metadata } from 'next';

import VideoFeed from '@/components/video-feed';
import App from '@/components/app';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{
    postId?: string;
    slug?: string;
    subreddit?: string;
  }> 
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `r/${params.subreddit}`,
    openGraph: {
      title: `r/${params.subreddit} | ReddTok`,
    },
  };
}

export default async function Home(props: Props) {
  const params = await props.params;

  return redirect('/');
  return (
    <App>
      <VideoFeed {...params} />
    </App>
  )
}
