import React from "react";

import AppDropdown from "@/components/app-dropdown";
import Link from "@/components/link";
import AppMuteButton from "./app-mute-button";
import AppSortMenu from "./app-sort-menu";

function AppHeader() {
  return (
    <div className="fixed flex flex-wrap top-0 right-0 left-0 p-2 lg:p-5 text-white pointer-events-none [&_*:not(.spacer)]:pointer-events-auto">
      <Link href='/'>
        <h1 className='text-2xl font-bold'>{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
      </Link>
      <AppSortMenu />
      <div className='spacer flex-grow'></div>
      <AppDropdown />

      {/* flexbox "line break" */}
      <div className="basis-full h-0" />

      <AppMuteButton />
    </div>
  )
}

export default React.memo(AppHeader);