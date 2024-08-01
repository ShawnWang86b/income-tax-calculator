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
  holdPrivateInsurance: boolean,
  totalWorkingDays?: number,
  totalWorkingHours?: number
) => {
  // let annualIncome;
  // switch (incomeType) {
  //   case "annually":
  //     annualIncome = income;
  //     break;
  //   case "monthly":
  //     annualIncome = income * 12;
  //     break;
  //   case "fortnightly":
  //     annualIncome = income * 26;
  //     break;
  //   case "weekly":
  //     annualIncome = income * 52;
  //     break;
  //   case "daily":
  //     annualIncome = income * (totalWorkingDays ?? 0); // Use default value of 0 if undefined
  //     break;
  //   case "hourly":
  //     annualIncome = income * (totalWorkingHours ?? 0); // Use default value of 0 if undefined
  //     break;
  //   default:
  //     annualIncome = 0; // Handle unexpected incomeType
  //     break;
  // }

  const taxableIncome = income - deductions;

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

  const fullTimeTaxResult = {
    income,
    taxableIncome,
    levy,
    taxPayable,
    medicalLevySurcharge,
    monthlyIncome: income / 12,
    monthlyTaxableIncome: taxableIncome / 12,
    monthlylevy: levy / 12,
    monthlyTaxPayable: taxPayable / 12,
    monthlyMedicalLevySurcharge: medicalLevySurcharge / 12,
    weeklyIncome: income / 52,
    weeklyTaxableIncome: taxableIncome / 52,
    weeklylevy: levy / 52,
    weeklyTaxPayable: taxPayable / 52,
    weeklyMedicalLevySurcharge: medicalLevySurcharge / 52,
  };

  return fullTimeTaxResult;
};
