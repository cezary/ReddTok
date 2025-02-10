import { MdiVolumeHigh, MdiVolumeMute } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/stores/ui";

export default function AppMuteButton() {
  const { muted, setMuted } = useUIStore();

  return (
    <section className='pointer-events-none [&_*]:pointer-events-auto'>
      {muted ? (
        <Button title='Unmute' onClick={() => setMuted(false)}>
          <MdiVolumeMute className='inline-block text-4xl' />
          Unmute
        </Button>
      ) : (
        <Button title='Mute' onClick={() => setMuted(true)} variant='link' className='p-0 [&_svg]:size-8'>
          <MdiVolumeHigh className='inline-block' />
        </Button>
      )}
    </section>
  )
}
