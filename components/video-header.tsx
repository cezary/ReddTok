import React from "react";

import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "./link";

function VideoHeader() {
  return (
    <div className="fixed flex top-0 left-0 pl-2 pt-2 lg:pt-5 lg:pl-5 pr-20 max-w-lg text-white">
      <SidebarTrigger className='[&_svg]:size-8' />
      <Link href='/'>
        <h1 className='text-2xl font-bold ml-2'>{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
      </Link>
    </div>
  )
}

export default React.memo(VideoHeader);