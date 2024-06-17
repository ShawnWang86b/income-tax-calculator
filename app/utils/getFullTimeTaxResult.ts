import { getIncomeTaxPayable } from "./getIncomeTaxPayable";
import { getMedicareLevy } from "./getMedicareLevy";

export const getFullTimeTaxResult = (
  incomeType: string,
  income: number,
  deductions: number,
  taxCredits: number
) => {
  let annualIncome;
  if (incomeType === "annually") {
    annualIncome = income;
  } else if (incomeType === "monthly") {
    annualIncome = income * 12;
  } else {
    // 5 days per week, 52 weeks per year
    annualIncome = income * 5 * 52;
  }

  const taxableIncome = annualIncome - deductions;

  const levy = getMedicareLevy(taxableIncome);

  let taxPayable = getIncomeTaxPayable(taxableIncome) - taxCredits;
  if (taxPayable < 0) {
    taxPayable = 0;
  }

  const fullTimeTaxResult = {
    annualIncome,
    taxableIncome,
    levy,
    taxPayable,
    monthlyIncome: annualIncome / 12,
    monthlyTaxableIncome: taxableIncome / 12,
    monthlylevy: levy / 12,
    monthlyTaxPayable: taxPayable / 12,
  };

  return fullTimeTaxResult;
};
