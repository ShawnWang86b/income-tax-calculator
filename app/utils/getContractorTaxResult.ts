import { getIncomeTaxPayable } from "./getIncomeTaxPayable";
import { getMedicareLevy } from "./getMedicareLevy";

export const getContractorTaxResult = (
  dailyRate: number,
  totalDays: number,
  businessExpenses: number,
  taxCredits: number
) => {
  const annualIncome = dailyRate * totalDays;
  const taxableIncome = annualIncome - businessExpenses;

  const levy = getMedicareLevy(taxableIncome);

  let taxPayable = getIncomeTaxPayable(taxableIncome) - taxCredits;
  if (taxPayable < 0) {
    taxPayable = 0;
  }

  const contractorTaxResult = {
    annualIncome,
    taxableIncome,
    levy,
    taxPayable,
    monthlyIncome: annualIncome / 12,
    monthlyTaxableIncome: taxableIncome / 12,
    monthlylevy: levy / 12,
    monthlyTaxPayable: taxPayable / 12,
  };

  return contractorTaxResult;
};
