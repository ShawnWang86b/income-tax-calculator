import taxRates from "@/app/data/taxRates.json";

export const getTaxableIncomeAnnually = (
  incomeYear: string,
  activeResidentTab: string
) => {
  const filteredTaxRate = taxRates[incomeYear]?.[activeResidentTab];
  return filteredTaxRate;
};
