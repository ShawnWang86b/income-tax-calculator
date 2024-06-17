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
import HelpButton from "./components/HelpButton";
import { ShareDialog } from "./components/ShareDialog";

export default function Home() {
  const { employmentType } = useTaxStore();

  return (
    <main className="flex justify-center items-center max-w-6xl mx-auto h-screen gap-2">
      <section className="w-[70%] flex flex-col justify-center items-center border py-10">
        <EmploymentTypeForm />
        {employmentType === "full-time" && <FullTimeTaxForm />}
        {employmentType === "part-time" && <PartTimeTaxForm />}
        {employmentType === "casual" && <CasualTaxForm />}
        {employmentType === "contractor" && <ContractorTaxForm />}
      </section>

      <section className="w-full">
        {employmentType === "full-time" && <FullTimeTable />}
        {employmentType === "part-time" && <PartTimeTable />}
        {employmentType === "casual" && <CasualTable />}
        {employmentType === "contractor" && <ContractorTable />}
      </section>

      <div className="absolute bottom-36 right-10">
        <ShareDialog />
      </div>
      <div className="absolute bottom-16 right-10">
        <HelpButton />
      </div>
    </main>
  );
}
