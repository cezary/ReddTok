import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "./ui/separator"
import { useUIStore } from "@/lib/stores/ui"

export default function AppDialog() {
  const { dialog: alert, closeDialogCallback: closeAlertCallback, clearDialog: clearAlert } = useUIStore()

  function handleOpenChange(open: boolean) {
    if (!open) {
      clearAlert();
      closeAlertCallback?.();
    }
  }

  return (
    <Dialog open={!!alert} onOpenChange={handleOpenChange}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>{alert?.title}</DialogTitle>
          <DialogDescription className='text-left whitespace-pre-wrap'>
            {alert?.description}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <DialogFooter className='flex-row justify-center gap-2'>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}