import { useEffect, useState } from "react";

import { IcRoundPlayArrow, MaterialSymbolsArrowCoolDownRounded, MdiDotsHorizontal, MdiFullscreen, MdiVolumeMute } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { requestFullscreen } from "@/lib/video";
import { MdVolumeUp } from "react-icons/md";
import { useUIStore } from "@/lib/stores/ui";

interface VideoProgressProps {
  playerRef: React.RefObject<HTMLVideoElement | null>;
  autoscroll: boolean;
  onAutoscrollToggle: (autoscroll: boolean) => void;
}

export default function VideoButtons({ autoscroll, onAutoscrollToggle, playerRef, }: VideoProgressProps) {
  const { muted, setMuted, paused, setPaused } = useUIStore();
  function handleFullscreen() {
    const currentVideoEl = playerRef.current;

    if (!currentVideoEl) {
      return;
    }

    requestFullscreen(currentVideoEl);
  }

  function handlePlayClick() {
    setPaused(!paused);
  }

  const [open, setOpen] = useState(false);

  useEffect(function () {
    function handleEnded() {
      setOpen(false);
    }
    const playerEl = playerRef.current;

    playerEl?.addEventListener('onended', handleEnded);

    return () => playerEl?.removeEventListener('onended', handleEnded);
  }, []);

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
      <section className="absolute top-0 lg:top-0 right-0 text-white p-2">
        <DropdownMenu
          open={open}
          onOpenChange={setOpen}
          modal={false}
        >
          <DropdownMenuTrigger
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => {
              if (!matchMedia('(min-width: 1024px)').matches) {
                return;
              }

              setTimeout(() => {
                setOpen(!!document.querySelector('[data-radix-popper-content-wrapper]:has(:hover)'))
              }, 1000)
            }}
          >
            <MdiDotsHorizontal className='inline-block text-white text-4xl' />
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom'
          onMouseLeave={(() => {
              if (!matchMedia('(min-width: 1024px)').matches) {
                return;
              }

            setTimeout(() => {
              setOpen(!!document.querySelector('[data-radix-popper-content-wrapper]:has(:hover)'))
            }, 500)
          })}
          >
            <DropdownMenuItem className='[&>svg]:size-7 [&>label]:grow [&>label+*]:ml-2'>
              <MaterialSymbolsArrowCoolDownRounded className='inline-block' />
              <Label htmlFor="autoscroll">
                Autoscroll
              </Label>
              <Switch
                id="autoscroll"
                checked={autoscroll}
                onClick={e => {
                  e.stopPropagation()
                  onAutoscrollToggle(!autoscroll);
                }}
              />
            </DropdownMenuItem>
            <DropdownMenuItem className='[&>svg]:size-7 [&>label]:grow' onClick={() => setMuted(!muted)} >
              <MdiVolumeMute className='inline-block' />
              <Label>
                Mute
              </Label>
              <Switch
                id="muted"
                checked={muted}
                onClick={e => {
                  e.stopPropagation();
                  setMuted(!muted);
                }}
              />
            </DropdownMenuItem>
            <DropdownMenuItem className='[&>svg]:size-7 [&>label]:grow' onClick={handleFullscreen}>
              <MdiFullscreen className='inline-block' />
              <Label>
                Fullscreen
              </Label>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <div className="text-center" onClick={handlePictureInPicture} title='Picture in Picture'>
          <MdPictureInPictureAlt className='inline-block text-4xl' />
        </div> */}
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
