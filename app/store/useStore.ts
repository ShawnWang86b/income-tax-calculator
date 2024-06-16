import { create } from "zustand";
interface IPartime {
  hourlyWage: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  deductions: number;
  taxCredits: number;
}
interface TaxState {
  employmentType: string;
  incomeType: string;
  fullTimeIncome: number;
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

  fullTimeResult: any;
  partTimeResult: IPartime;
  casualResult: any;
  contractorResult: any;

  reset: () => void;
  setEmploymentType: (employmentType: string) => void;
  setIncomeType: (incomeType: string) => void;

  setfullTimeIncome: (fullTimeIncome: number) => void;
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

  setFullTimeResult: (fullTimeResult: number) => void;
  setPartTimeResult: (partTimeResult: IPartime) => void;
  setCasualResult: (casualResult: number) => void;
  setContractorResult: (contractorResult: number) => void;
}

const initialState = {
  employmentType: "full-time",
  incomeType: "annually",

  fullTimeIncome: 0,
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

  fullTimeResult: {},
  partTimeResult: {
    hourlyWage: 0,
    hoursPerWeek: 0,
    weeksPerYear: 0,
    deductions: 0,
    taxCredits: 0,
  },
  casualResult: {},
  contractorResult: {},
};

const useTaxStore = create<TaxState>((set) => ({
  ...initialState,
  reset: () => {
    set(initialState);
  },
  setEmploymentType: (employmentType) => set(() => ({ employmentType })),
  setIncomeType: (incomeType) => set(() => ({ incomeType })),

  setfullTimeIncome: (fullTimeIncome) => set(() => ({ fullTimeIncome })),

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

  setFullTimeResult: (fullTimeResult) => set(() => ({ fullTimeResult })),
  setPartTimeResult: (partTimeResult) => set(() => ({ partTimeResult })),
  setCasualResult: (casualResult) => set(() => ({ casualResult })),
  setContractorResult: (contractorResult) => set(() => ({ contractorResult })),
}));

export default useTaxStore;
