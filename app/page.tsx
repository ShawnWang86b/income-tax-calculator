"use client";

import useTaxStore from "@/app/store/useStore";
import { TaxForm } from "./components/TaxForm";
import { useEffect } from "react";

export default function Home() {
  const {
    employmentType,
    incomeType,
    deduction,
    taxCredit,
    setEmploymentType,
    reset,
  } = useTaxStore();

  const handleChange = (event: any) => {
    setEmploymentType(event.target.value);
  };
  return (
    <main>
      main page
      <TaxForm />
      <div>
        <h1>employmentType: {employmentType}</h1>
        <h1>incomeType: {incomeType}</h1>
        <h1>deduction: {deduction}</h1>
        <h1>taxCredit: {taxCredit}</h1>

        <h1 onClick={reset}>reset</h1>

        <label htmlFor="employment-type">Employment Type111:</label>
        <input
          id="employment-type"
          type="text"
          value={employmentType}
          onChange={handleChange}
        />
      </div>
    </main>
  );
}
