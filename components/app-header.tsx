import React from "react";
import { useSearchParams } from "next/navigation";

import { MdiAlert, MdiFire, MdiFormatVerticalAlignTop, MdiNewBox, MdiTrendingUp } from "@/components/icons";
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

function AppHeader() {
  return (
    <div className="fixed flex top-0 right-0 left-0 pl-2 pt-2 lg:pt-5 lg:pl-5 max-w-lg text-white">
      <Link href='/'>
        <h1 className='text-2xl font-bold'>{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
      </Link>
      <SortDropdownMenu />
    </div>
  )
}

export default React.memo(AppHeader);