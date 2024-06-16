import { getIncomeTaxPayable } from "./getIncomeTaxPayable";
import { getMedicareLevy } from "./getMedicareLevy";

export const getPartTimeTaxResult = (
  hourlyWage: number,
  hoursPerWeek: number,
  weeksPerYear: number,
  deductions: number,
  taxCredits: number
) => {
  const annualIncome = hourlyWage * hoursPerWeek * weeksPerYear;
  const taxableIncome = annualIncome - deductions;

  const levy = getMedicareLevy(taxableIncome);

  const taxPayable = getIncomeTaxPayable(taxableIncome) - taxCredits;

  const partTimeTaxResult = {
    annualIncome,
    taxableIncome,
    levy,
    taxPayable,
    monthlyIncome: annualIncome / 12,
    monthlyTaxableIncome: taxableIncome / 12,
    monthlylevy: levy / 12,
    monthlyTaxPayable: taxPayable / 12,
  };

  return partTimeTaxResult;
};
