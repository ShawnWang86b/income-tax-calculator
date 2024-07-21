"use client";

import useTaxStore from "@/app/store/useStore";
import { EmploymentTypeForm } from "@/app/components/EmploymentTypeForm";
import { PartTimeTaxForm } from "@/app/components/PartTimeTaxForm";
import { FullTimeTaxForm } from "@/app/components/FullTimeTaxForm";
import { CasualTaxForm } from "./components/CasualTaxForm";
import { ContractorTaxForm } from "./components/ContractorTaxForm";
import { FullTimeTable } from "./components/FullTimeTable";
import { PartTimeTable } from "./components/PartTimeTable";
import { CasualTable } from "./components/CasualTable";
import { ContractorTable } from "./components/ContractorTable";
import SideBar from "./components/SideBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CircleHelp } from "lucide-react";
import MobileHeader from "./components/MobileHeader";
import { useEffect, useState } from "react";

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
      <SideBar className="hidden lg:flex" />
      <main className="flex h-screen lg:pl-[280px]">
        {/* @ts-ignore */}
        <ResizablePanelGroup direction={direction} className="rounded-md">
          <ResizablePanel defaultSize={35}>
            <div className="flex justify-center items-start h-screen pt-16 lg:pt-4 px-4 overflow-auto">
              <section className="min-w-96 flex flex-col justify-center items-start px-10 border-[1px] border-slate-200 bg-muted py-5 w-full">
                <div className="flex justify-between w-full">
                  <div>Simple Tax Calculator</div>
                  <div className="flex gap-1 items-center">
                    <p>Help</p>
                    <CircleHelp className="h-5 w-5" />
                  </div>
                </div>
                <EmploymentTypeForm />
                {employmentType === "full-time" && <FullTimeTaxForm />}
                {employmentType === "part-time" && <PartTimeTaxForm />}
                {employmentType === "casual" && <CasualTaxForm />}
                {employmentType === "contractor" && <ContractorTaxForm />}
              </section>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={65}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60}>
                <section className="w-full h-screen p-4">
                  {employmentType === "full-time" && <FullTimeTable />}
                  {employmentType === "part-time" && <PartTimeTable />}
                  {employmentType === "casual" && <CasualTable />}
                  {employmentType === "contractor" && <ContractorTable />}
                </section>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={40}>
                <span className="font-semibold">Three</span>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}
