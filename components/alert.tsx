import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Separator } from "./ui/separator"
import { useUIStore } from "@/lib/stores/ui"

export default function Alert() {
  const { alert, closeAlertCallback, clearAlert } = useUIStore()

  function handleOpenChange(open: boolean) {
    if (!open) {
      clearAlert();
      closeAlertCallback?.();
    }
  }

  return (
    <AlertDialog open={!!alert} onOpenChange={handleOpenChange}>
      <AlertDialogContent className='max-w-sm'>
        <AlertDialogHeader>
          <AlertDialogTitle>{alert?.title}</AlertDialogTitle>
          <AlertDialogDescription className='text-left whitespace-pre-wrap'>
            {alert?.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className='flex-row justify-center gap-2'>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}