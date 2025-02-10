import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/stores/ui";


export default function AboutButton() {
  const { setAlert } = useUIStore();

  function handleAboutClick() {
    setAlert({
      title: 'About',
      description: (
        <>
          {process.env.NEXT_PUBLIC_SITE_NAME} is a TikTok-like client for Reddit videos.
          <br />
          <br />
          Made by <a href='https://x.com/czarizard' className='text-white' target='_blank' rel='noreferrer'>@czarizard</a>.
          <br />
          <br />
          Source available on <a href='https://github.com/cezary/reddtok' className='text-white' target='_blank' rel='noreferrer'>GitHub</a>.
        </>
      )
    })
  }

  return (
    <Button variant='link' onClick={handleAboutClick}>
      <p className='ml-2'>About</p>
    </Button>
  )
}