import { getTaxableIncomeAnnually } from "./getTaxableIncomeAnnually";

export const getBaseSalaryByInHandMoney = (
  netIncome: number,
  incomeYear: string,
  activeResidentTab: string,
  deductions: number
) => {
  const taxBrackets = getTaxableIncomeAnnually(incomeYear, activeResidentTab);
  const levyRate = 0.02;

  function findTaxRate(baseSalary: number, rates: any) {
    for (const rate of rates) {
      if (baseSalary > rate.threshold) {
        return rate;
      }
    }
    return rates[rates.length - 1]; // default case, should never hit
  }

  function calculateBaseSalary(netSalary: number, deductions: number): number {
    let baseSalary = netSalary + deductions; // Initial guess
    let previousBaseSalary: number;

    do {
      previousBaseSalary = baseSalary;
      const applicableTaxRate = findTaxRate(baseSalary, taxBrackets);
      const tax =
        applicableTaxRate.baseTax +
        (baseSalary - applicableTaxRate.threshold) * applicableTaxRate.rate;
      const levy = baseSalary * levyRate;
      baseSalary = netSalary + tax + levy + deductions;
    } while (Math.abs(baseSalary - previousBaseSalary) > 0.01);

    return baseSalary;
  }

  // here input deductions
  const baseSalary = calculateBaseSalary(netIncome, deductions);
  return baseSalary;
};
