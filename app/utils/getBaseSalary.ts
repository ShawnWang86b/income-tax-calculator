import { getBaseSalaryByInHandMoney } from "@/app/utils/getBaseSalaryByInHandMoney";

export const getBaseSalary = (
  salary: number,
  incomeType: string,
  superRate: number,
  incomeYear: string,
  activeResidentTab: string,
  deductions: number,
  totalWorkingDays?: number,
  totalWorkingHours?: number
) => {
  let baseSalary;
  if (incomeType === "Package") {
    baseSalary = salary / (1 + superRate / 100);
  } else if (incomeType === "In hand") {
    baseSalary = getBaseSalaryByInHandMoney(
      salary,
      incomeYear,
      activeResidentTab,
      deductions
    );
  } else {
    // Base salary
    baseSalary = salary;
  }

  return baseSalary;
};
