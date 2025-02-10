import { useEffect, useState } from "react";

import { MaterialSymbolsArrowCoolDownRounded, MdiDotsHorizontal, MdiFullscreen, MdiVolumeMute } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { requestFullscreen } from "@/lib/video";
import { useUIStore } from "@/lib/stores/ui";

export default function AppDropdown() {
  const { autoscroll, setAutoscroll, muted, setMuted } = useUIStore();

  function handleFullscreen() {
    const currentVideoEl = document.querySelector('video');

    if (!currentVideoEl) {
      return;
    }

    requestFullscreen(currentVideoEl);
  }

  const [open, setOpen] = useState(false);

  useEffect(function () {
    function handleEnded() {
      setOpen(false);
    }
    const playerEl = document.querySelector('video');

    playerEl?.addEventListener('onended', handleEnded);

    return () => playerEl?.removeEventListener('onended', handleEnded);
  }, []);


  return (
    <>
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
                  setAutoscroll(!autoscroll);
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
      </section>
    </>
  );
}
