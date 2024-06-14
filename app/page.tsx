"use client";

import useTaxStore from "@/app/store/useStore";
import { getIncomeTaxPayable } from "@/app/utils/getIncomeTaxPayable";
import { getMedicareLevy } from "@/app/utils/getMedicareLevy";
import { EmploymentTypeForm } from "@/app/components/EmploymentTypeForm";
import { PartTimeTaxForm } from "@/app/components/PartTimeTaxForm";
import { FullTimeTaxForm } from "@/app/components/FullTimeTaxForm";
import { CasualTaxForm } from "./components/CasualTaxForm";
import { ContractorTaxForm } from "./components/ContractorTaxForm";
import { DisplayTable } from "./components/DisplayTable";

export default function Home() {
  const { employmentType, reset } = useTaxStore();

  const tax = getIncomeTaxPayable(80000);
  const levy = getMedicareLevy(80000);

  return (
    <main className="flex justify-center items-center max-w-7xl mx-auto h-screen ">
      <section className="w-[60%] flex flex-col justify-center items-center">
        <EmploymentTypeForm />
        {employmentType === "full-time" && <FullTimeTaxForm />}
        {employmentType === "part-time" && <PartTimeTaxForm />}
        {employmentType === "casual" && <CasualTaxForm />}
        {employmentType === "contractor" && <ContractorTaxForm />}
      </section>

      <section className="w-full">
        <DisplayTable />
      </section>
    </main>
  );
}
