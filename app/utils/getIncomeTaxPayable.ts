import { getTaxableIncomeAnnually } from "./getTaxableIncomeAnnually";

export const getIncomeTaxPayable = (
  income: number,
  incomeYear: string,
  activeResidentTab: string
) => {
  const taxBrackets = getTaxableIncomeAnnually(incomeYear, activeResidentTab);

  if (taxBrackets) {
    for (const bracket of taxBrackets) {
      if (income > bracket.threshold) {
        return bracket.baseTax + (income - bracket.threshold) * bracket.rate;
      }
    }
  }

  return 0;
};
