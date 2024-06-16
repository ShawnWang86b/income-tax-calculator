const taxBrackets = [
  { minIncome: 180001, baseTax: 51667, taxRate: 0.45 },
  { minIncome: 120001, baseTax: 29467, taxRate: 0.37 },
  { minIncome: 45001, baseTax: 5092, taxRate: 0.325 },
  { minIncome: 18201, baseTax: 0, taxRate: 0.19 },
  { minIncome: 0, baseTax: 0, taxRate: 0 },
];

export const getIncomeTaxPayable = (income: number) => {
  for (const bracket of taxBrackets) {
    if (income > bracket.minIncome) {
      return bracket.baseTax + (income - bracket.minIncome) * bracket.taxRate;
    }
  }
  return 0;
};
