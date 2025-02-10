import { IcRoundPlayArrow, MdiVolumeMute } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { MdVolumeUp } from "react-icons/md";
import { useUIStore } from "@/lib/stores/ui";

export default function VideoButtons() {
  const { muted, setMuted, paused, setPaused } = useUIStore();
  function handlePlayClick() {
    setPaused(!paused);
  }

  return (
    <>
      <section className="absolute top-12 lg:top-14 pl-2 lg:pl-5 text-white">
        {muted ? (
          <Button title='Unmute' onClick={() => setMuted(false)}>
            <MdiVolumeMute className='inline-block text-4xl' />
            Unmute
          </Button>
        ) : (
          <Button title='Mute' onClick={() => setMuted(true)} variant='link' className='p-0 [&_svg]:size-8'>
            <MdVolumeUp className='inline-block' />
          </Button>
        )}
      </section>
      <section>
          {paused ? (
            <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-white" onClick={handlePlayClick} title={paused ? 'Play' : 'Pause'}>
              <IcRoundPlayArrow className='inline-block text-9xl' />
            </div>
          ) : null}
      </section>
    </>
  );
}
