import taxRates from "@/app/data/taxRates.json";

export const getTaxableIncomeAnnually = (
  incomeYear: string,
  activeResidentTab: string
) => {
  // @ts-ignore
  const filteredTaxRate = taxRates[incomeYear]?.[activeResidentTab];
  return filteredTaxRate;
};
