import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TContent } from "@/types/content";
import ManipulateContent from "./ManipulateContent";

export default function ContentUpdateModal({
    content,
    open,
    setOpen
}: {
    content: TContent | null;
    open: boolean;
    setOpen: (open: boolean) => void
}) {
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-100!">
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            <ManipulateContent content={content} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
