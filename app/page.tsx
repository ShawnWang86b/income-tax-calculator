"use client";

import useTaxStore from "@/app/store/useStore";
import { FullTimeTaxForm } from "@/app/components/FullTimeTaxForm";
import { FullTimeTable } from "@/app/components/FullTimeTable";
import SideBar from "@/app/components/SideBar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleHelp } from "lucide-react";
import MobileHeader from "@/app/components/MobileHeader";
import { useEffect, useState } from "react";
import { IncomeYearForm } from "@/app/components/IncomeYearForm";
import Chart from "@/app/components/Chart";

export default function Home() {
  const { employmentType } = useTaxStore();
  const [direction, setDirection] = useState("horizontal");
  useEffect(() => {
    const handleResize = () => {
      setDirection(window.innerWidth <= 1024 ? "vertical" : "horizontal");
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <MobileHeader />
      <SideBar className="hidden 2xl:flex" />
      <main className="flex h-screen 2xl:pl-[280px]">
        {/* @ts-ignore */}
        <ResizablePanelGroup direction={direction} className="rounded-md">
          <ResizablePanel defaultSize={35}>
            <div className="flex justify-center items-start pt-14 2xl:pt-4 px-4 h-[100%] scroll-container">
              <section className="min-w-96 flex flex-col justify-center items-start px-10 border-[1px] border-slate-200 bg-muted py-5 w-full">
                <div className="flex justify-between w-full">
                  <div className="text-xl font-semibold">
                    Simple Tax Calculator
                  </div>

                  <Sheet>
                    <SheetTrigger>
                      <div className="flex text-lg gap-1 items-center hover:text-themePrimary hover:scale-90 cursor-pointer transition duration-200 ease-in-out">
                        <p>Help</p>
                        <CircleHelp className="h-5 w-5" />
                      </div>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]">
                      <SheetHeader>
                        <SheetTitle>Help with this content</SheetTitle>
                        <SheetDescription>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="item-1">
                              <AccordionTrigger>
                                Is it accessible?
                              </AccordionTrigger>
                              <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                              <AccordionTrigger>Is it styled?</AccordionTrigger>
                              <AccordionContent>
                                Yes. It comes with default styles that matches
                                the other components&apos; aesthetic.
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                              <AccordionTrigger>
                                Is it animated?
                              </AccordionTrigger>
                              <AccordionContent>
                                Yes. It&apos;s animated by default, but you can
                                disable it if you prefer.
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="border-b-2 border-themePrimary w-full py-1"></div>
                <p className="text-sm pt-2">
                  All fields marked with * are mandatory
                </p>
                <div className="w-full py-2">
                  <IncomeYearForm />
                </div>
                <FullTimeTaxForm />
              </section>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={65}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60}>
                <section className="w-full pt-14 2xl:pt-4 h-[100%] scroll-container">
                  <FullTimeTable />
                </section>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={40}>
                <div className="font-semibold w-[100%] flex justify-center items-center">
                  <Chart />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}
