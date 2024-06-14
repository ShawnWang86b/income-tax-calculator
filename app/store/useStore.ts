import { create } from "zustand";

interface TaxState {
  employmentType: string;
  incomeType: string;
  fullTimeAnnuallySalary: number;
  fullTimeMonthlySalary: number;
  fullTimeDailySalary: number;
  fullTimeDeductions: number;
  fullTimeTaxCredits: number;

  partTimeHourlyWage: number;
  partTimeHoursPerWeek: number;
  partTimeWeeksPerYear: number;
  partTimeDeductions: number;
  partTimeTaxCredits: number;

  casualHourlyWage: number;
  casualTotalHours: number;
  casualDeductions: number;
  casualTaxCredits: number;

  contractorDailyRate: number;
  contractorTotalDays: number;
  contractorBusinessExpenses: number;
  contractorTaxCredits: number;
  reset: () => void;
  setEmploymentType: (employmentType: string) => void;
  setIncomeType: (incomeType: string) => void;

  setFullTimeAnnuallySalary: (fullTimeAnnuallySalary: number) => void;
  setFullTimeMonthlySalary: (fullTimeMonthlySalary: number) => void;
  setFullTimeDailySalary: (fullTimeDailySalary: number) => void;
  setFullTimeDeductions: (deductions: number) => void;
  setFullTimeTaxCredits: (taxCredits: number) => void;

  setPartTimeHourlyWage: (partTimeHourlyWage: number) => void;
  setPartTimeHoursPerWeek: (partTimeHoursPerWeek: number) => void;
  setPartTimeWeeksPerYear: (partTimeWeeksPerYear: number) => void;
  setPartTimeDeductions: (partTimeDeductions: number) => void;
  setPartTimeTaxCredits: (partTimeTaxCredits: number) => void;

  setCasualHourlyWage: (casualHourlyWage: number) => void;
  setCasualTotalHours: (casualTotalHours: number) => void;
  setCasualDeductions: (casualDeductions: number) => void;
  setCasualTaxCredits: (casualTaxCredits: number) => void;

  setContractorDailyRate: (contractorDailyRate: number) => void;
  setContractorTotalDays: (contractorTotalDays: number) => void;
  setContractorBusinessExpenses: (contractorBusinessExpenses: number) => void;
  setContractorTaxCredits: (contractorTaxCredits: number) => void;
}

const initialState = {
  employmentType: "full-time",
  incomeType: "annually",
  fullTimeAnnuallySalary: 0,
  fullTimeMonthlySalary: 0,
  fullTimeDailySalary: 0,
  fullTimeDeductions: 0,
  fullTimeTaxCredits: 0,

  partTimeHourlyWage: 0,
  partTimeHoursPerWeek: 0,
  partTimeWeeksPerYear: 0,
  partTimeDeductions: 0,
  partTimeTaxCredits: 0,

  casualHourlyWage: 0,
  casualTotalHours: 0,
  casualDeductions: 0,
  casualTaxCredits: 0,

  contractorDailyRate: 0,
  contractorTotalDays: 0,
  contractorBusinessExpenses: 0,
  contractorTaxCredits: 0,
};

const useTaxStore = create<TaxState>((set) => ({
  ...initialState,
  reset: () => {
    set(initialState);
  },
  setEmploymentType: (employmentType) => set(() => ({ employmentType })),
  setIncomeType: (incomeType) => set(() => ({ incomeType })),
  setFullTimeAnnuallySalary: (fullTimeAnnuallySalary) =>
    set(() => ({ fullTimeAnnuallySalary })),
  setFullTimeMonthlySalary: (fullTimeMonthlySalary) =>
    set(() => ({ fullTimeMonthlySalary })),
  setFullTimeDailySalary: (fullTimeDailySalary) =>
    set(() => ({ fullTimeDailySalary })),
  setFullTimeDeductions: (fullTimeDeductions) =>
    set(() => ({ fullTimeDeductions })),
  setFullTimeTaxCredits: (fullTimeTaxCredits) =>
    set(() => ({ fullTimeTaxCredits })),

  setPartTimeHourlyWage: (partTimeHourlyWage) =>
    set(() => ({ partTimeHourlyWage })),
  setPartTimeHoursPerWeek: (partTimeHoursPerWeek) =>
    set(() => ({ partTimeHoursPerWeek })),
  setPartTimeWeeksPerYear: (partTimeWeeksPerYear) =>
    set(() => ({ partTimeWeeksPerYear })),
  setPartTimeDeductions: (partTimeDeductions) =>
    set(() => ({ partTimeDeductions })),
  setPartTimeTaxCredits: (partTimeTaxCredits) =>
    set(() => ({ partTimeTaxCredits })),

  setCasualHourlyWage: (casualHourlyWage) => set(() => ({ casualHourlyWage })),
  setCasualTotalHours: (casualTotalHours) => set(() => ({ casualTotalHours })),
  setCasualDeductions: (casualDeductions) => set(() => ({ casualDeductions })),
  setCasualTaxCredits: (casualTaxCredits) => set(() => ({ casualTaxCredits })),

  setContractorDailyRate: (contractorDailyRate) =>
    set(() => ({ contractorDailyRate })),
  setContractorTotalDays: (contractorTotalDays) =>
    set(() => ({ contractorTotalDays })),
  setContractorBusinessExpenses: (contractorBusinessExpenses) =>
    set(() => ({ contractorBusinessExpenses })),
  setContractorTaxCredits: (contractorTaxCredits) =>
    set(() => ({ contractorTaxCredits })),
}));

export default useTaxStore;
