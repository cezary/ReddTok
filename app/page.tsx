import { Metadata } from 'next';

import VideoFeed from '@/components/video-feed';
import App from '@/components/app';

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      title: 'ReddTok',
      images: [
        {
          url: '/logo-512.png',
          width: 512,
          height: 512,
        },
      ],
    },
  };
}

export default async function Home() {
  return (
    <App>
      <VideoFeed />
    </App>
  )

}
