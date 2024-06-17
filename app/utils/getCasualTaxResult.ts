import { getIncomeTaxPayable } from "./getIncomeTaxPayable";
import { getMedicareLevy } from "./getMedicareLevy";

export const getCasualTaxResult = (
  hourlyWage: number,
  totalHours: number,
  deductions: number,
  taxCredits: number
) => {
  const annualIncome = hourlyWage * totalHours;
  const taxableIncome = annualIncome - deductions;

  const levy = getMedicareLevy(taxableIncome);

  let taxPayable = getIncomeTaxPayable(taxableIncome) - taxCredits;
  if (taxPayable < 0) {
    taxPayable = 0;
  }

  const casualTaxResult = {
    annualIncome,
    taxableIncome,
    levy,
    taxPayable,
    monthlyIncome: annualIncome / 12,
    monthlyTaxableIncome: taxableIncome / 12,
    monthlylevy: levy / 12,
    monthlyTaxPayable: taxPayable / 12,
  };

  return casualTaxResult;
};
