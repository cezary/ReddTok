import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useIsMobile } from '@/hooks/use-mobile';
import { useUIStore } from '@/lib/stores/ui';
import { Button } from "./ui/button";

export default function CommentsDrawer() {
  const { isCommentDrawerOpen, setCommentDrawerOpen } = useUIStore();
  const isMobile = useIsMobile();

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'right'}
      defaultOpen={isCommentDrawerOpen}
      open={isCommentDrawerOpen}
      onOpenChange={setCommentDrawerOpen}
      noBodyStyles
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}