import { IcRoundPlayArrow  } from "@/components/icons";
import { useUIStore } from "@/lib/stores/ui";

export default function VideoButtons() {
  const { paused, setPaused } = useUIStore();
  function handlePlayClick() {
    setPaused(!paused);
  }

  return (
    <>
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
