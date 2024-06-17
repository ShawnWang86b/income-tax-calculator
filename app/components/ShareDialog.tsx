import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useToast } from "@/components/ui/use-toast";

export function ShareDialog() {
  const { toast } = useToast();
  const shareUrl = "https://yourwebsite.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        toast({
          description: "Coppied!",
        });
      },
      () => {
        toast({
          description: "Copy failed",
        });
      }
    );
  };

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Share2 className="cursor-pointer hover:bg-stone-100 hover:text-[#874ac4] p-[4px] rounded-lg " />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share to media</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share with friends</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start space-y-4 ">
          <div className="flex space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue="https://ui.shadcn.com/docs/installation"
                readOnly
              />
            </div>
            <Button
              type="submit"
              variant="formSubmit"
              size="sm"
              className="px-3"
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" onClick={copyToClipboard} />
            </Button>
          </div>

          <div className="flex gap-2">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={28} round />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={28} round />
            </TwitterShareButton>

            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={28} round />
            </LinkedinShareButton>

            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={28} round />
            </WhatsappShareButton>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
