import { getIncomeTaxPayable } from "@/app/utils/getIncomeTaxPayable";
import { getMedicalLevySurcharge } from "@/app/utils/getMedicalLevySurchage";
import { getMedicareLevy } from "@/app/utils/getMedicareLevy";

/**
 * Calculates the result of Full time work
 *
 * @param {string} incomeYear - "2024"
 * @param {string} incomeType - "annually","monthly"
 * @param {number} income - 100000
 * @param {string} activeResidentTab - "Australian resident"
 * @param {number} deductions - 0
 * @param {number} taxCredits - 0
 */

export const getFullTimeTaxResult = (
  incomeYear: string,
  incomeType: string,
  income: number,
  activeResidentTab: string,
  deductions: number,
  taxCredits: number,
  holdPrivateInsurance: boolean
) => {
  console.log(1111, {
    incomeYear,
    incomeType,
    income,
    activeResidentTab,
    deductions,
    taxCredits,
  });
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

  let taxPayable =
    getIncomeTaxPayable(taxableIncome, incomeYear, activeResidentTab) -
    taxCredits;
  if (taxPayable < 0) {
    taxPayable = 0;
  }

  let medicalLevySurcharge;
  if (holdPrivateInsurance === true) {
    medicalLevySurcharge = 0;
  } else {
    medicalLevySurcharge = getMedicalLevySurcharge(
      income,
      incomeYear,
      activeResidentTab
    );
  }
  console.log("medicalLevySurcharge", medicalLevySurcharge);
  const fullTimeTaxResult = {
    annualIncome,
    taxableIncome,
    levy,
    taxPayable,
    medicalLevySurcharge,
    monthlyIncome: annualIncome / 12,
    monthlyTaxableIncome: taxableIncome / 12,
    monthlylevy: levy / 12,
    monthlyTaxPayable: taxPayable / 12,
    monthlyMedicalLevySurcharge: medicalLevySurcharge / 12,
    weeklyIncome: annualIncome / 52,
    weeklyTaxableIncome: taxableIncome / 52,
    weeklylevy: levy / 52,
    weeklyTaxPayable: taxPayable / 52,
    weeklyMedicalLevySurcharge: medicalLevySurcharge / 52,
  };

  return fullTimeTaxResult;
};
