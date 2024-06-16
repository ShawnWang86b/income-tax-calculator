"use client";

import useTaxStore from "@/app/store/useStore";
import { getIncomeTaxPayable } from "@/app/utils/getIncomeTaxPayable";
import { getMedicareLevy } from "@/app/utils/getMedicareLevy";
import { EmploymentTypeForm } from "@/app/components/EmploymentTypeForm";
import { PartTimeTaxForm } from "@/app/components/PartTimeTaxForm";
import { FullTimeTaxForm } from "@/app/components/FullTimeTaxForm";
import { CasualTaxForm } from "./components/CasualTaxForm";
import { ContractorTaxForm } from "./components/ContractorTaxForm";
import { FullTimeTable } from "./components/FullTimeTable";
import { PartTimeTable } from "./components/PartTimeTable";
import { CasualTable } from "./components/CasualTable";
import { ContractorTable } from "./components/ContractorTable";

export default function Home() {
  const { employmentType, reset, partTimeResult } = useTaxStore();

  return (
    <main className="flex justify-center items-center max-w-5xl mx-auto h-screen gap-2">
      <section className="w-[70%] flex flex-col justify-center items-center border px-4 py-10">
        <EmploymentTypeForm />
        {employmentType === "full-time" && <FullTimeTaxForm />}
        {employmentType === "part-time" && <PartTimeTaxForm />}
        {employmentType === "casual" && <CasualTaxForm />}
        {employmentType === "contractor" && <ContractorTaxForm />}
      </section>

      <section className="w-full ">
        {employmentType === "full-time" && <FullTimeTable />}
        {employmentType === "part-time" && <PartTimeTable />}
        {employmentType === "casual" && <CasualTable />}
        {employmentType === "contractor" && <ContractorTable />}
      </section>
    </main>
  );
}
