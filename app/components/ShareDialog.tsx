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
  const shareUrl = "https://income-tax-calculator-fawn.vercel.app/";

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
              <Button
                variant="formSubmit"
                className="w-12 h-12 p-2 rounded-full"
              >
                <Share2 />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share with friends</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Share with friends</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start space-y-4 ">
          <div className="flex space-x-2 items-center">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue="https://income-tax-calculator-fawn.vercel.app/"
                readOnly
                className="w-[400px] h-[50px]"
              />
            </div>
            <Button
              type="submit"
              variant="formSubmit"
              size="lg"
              className="px-3"
            >
              <span className="sr-only">Copy</span>
              <Copy onClick={copyToClipboard} />
            </Button>
          </div>

          <div className="flex gap-4 pt-2">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
