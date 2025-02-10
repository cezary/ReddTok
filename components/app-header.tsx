import React from "react";
import { useSearchParams } from "next/navigation";

import AppDropdown from "@/components/app-dropdown";
import { MdiAlert, MdiFire, MdiFormatVerticalAlignTop, MdiNewBox, MdiTrendingUp, MdiVolumeHigh, MdiVolumeMute } from "@/components/icons";
import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { SidebarTrigger } from "@/components/ui/sidebar"
import { DEFAULT_SORT } from "@/lib/constants";
import { Sort, SORTS } from "@/lib/types";
import { useUIStore } from "@/lib/stores/ui";

const sortIconMap: Record<Sort, React.ReactNode> = {
  hot: <MdiFire className='inline-block text-4xl' />,
  new: <MdiNewBox className='inline-block text-4xl' />,
  top: <MdiFormatVerticalAlignTop className='inline-block text-4xl' />,
  rising: <MdiTrendingUp className='inline-block text-4xl' />,
  controversial: <MdiAlert className='inline-block text-4xl' />,
}

function SortDropdownMenu() {
  const searchParams = useSearchParams();
  const currentSort: Sort = (SORTS.includes(searchParams.get('sort') as Sort) ? searchParams.get('sort') : DEFAULT_SORT) as Sort;

  return (
      <section className="text-white">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='link'>
              {sortIconMap[currentSort]}
              {currentSort}
            </Button>
          </DropdownMenuTrigger> 
          <DropdownMenuContent>
            {SORTS.map(sort => (
              <DropdownMenuItem key={sort} className='text-base' asChild>
                <Link href={`?sort=${sort}`} className='flex flex-row items-center cursor-pointer'>
                  {sortIconMap[sort]}
                  <p className='ml-2'>{sort}</p>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
  )
}

function AppMuteButton() {
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

function AppHeader() {
  return (
    <div className="fixed flex flex-wrap top-0 right-0 left-0 p-2 lg:p-5 text-white pointer-events-none [&_*:not(.spacer)]:pointer-events-auto">
      <Link href='/'>
        <h1 className='text-2xl font-bold'>{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
      </Link>
      <SortDropdownMenu />
      <div className='spacer flex-grow'></div>
      <AppDropdown />

      {/* flexbox "line break" */}
      <div className="basis-full h-0" />

      <AppMuteButton />
    </div>
  )
}

export default React.memo(AppHeader);