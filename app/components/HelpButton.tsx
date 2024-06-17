import { Button } from "@/components/ui/button";
import { ListCollapse } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const HelpButton = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="formSubmit"
                className="w-12 h-12 p-2 rounded-full"
              >
                <ListCollapse />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Contact me & Help</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="pb-4">
            Disclaimers and assumptions
          </DrawerTitle>
          <DrawerDescription>
            <div className="flex flex-col gap-2">
              <p>The rates are for Australian residents.</p>
              <p>
                Your marginal tax rate does not include the Medicare levy, which
                is calculated separately.
              </p>
              <p>
                The Medicare levy is calculated as 2% of taxable income for most
                taxpayers. The Medicare levy in this calculator is based on
                individual rates and does not take into account family income or
                dependent children.
              </p>
              <p>
                The calculations do not include the Medicare Levy Surcharge
                (1%-1.5%), an additional levy on individuals and families with
                higher incomes who do not have private health insurance. See
                Medicare levy surcharge income, thresholds and rates on the ATO
                website.
              </p>
              <p>
                These calculations do not take into account any tax rebates or
                tax offsets you may be entitled to.
              </p>
              <p className="font-bold">Contact: Shawn 0420123456</p>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <div className="bg-[#874ac4] text-secondary-foreground text-white tracking-wider hover:bg-[#874ac4]/80 w-[6%] py-2 px-1 mx-auto rounded-md">
              Cancel
            </div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default HelpButton;
