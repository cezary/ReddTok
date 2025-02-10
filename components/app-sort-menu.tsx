import { useSearchParams } from "next/navigation";

import { MdiAlert, MdiFire, MdiFormatVerticalAlignTop, MdiNewBox, MdiTrendingUp } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "@/components/link";
import { DEFAULT_SORT } from "@/lib/constants";
import { Sort, SORTS } from "@/lib/types";

export const sortIconMap: Record<Sort, React.ReactNode> = {
  hot: <MdiFire className='inline-block text-4xl' />,
  new: <MdiNewBox className='inline-block text-4xl' />,
  top: <MdiFormatVerticalAlignTop className='inline-block text-4xl' />,
  rising: <MdiTrendingUp className='inline-block text-4xl' />,
  controversial: <MdiAlert className='inline-block text-4xl' />,
}

export default function AppSortMenu() {
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