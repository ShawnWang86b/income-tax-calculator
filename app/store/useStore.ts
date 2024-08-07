import { create } from "zustand";

interface IFulltime {
  incomeYear: string;
  incomeType: string;
  activeSalaryTypeTab: string;
  income: number;
  activeResidentTab: string;
  superRate: number;
  deductions: number;
  taxCredits: number;
  holdPrivateInsurance: boolean;
  totalWorkingDays?: number;
  totalWorkingHours?: number;
}

interface TaxState {
  employmentType: string;
  incomeYear: string;
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

  fullTimeResult: IFulltime;

  canAddResult: boolean;

  reset: () => void;
  setIncomeYear: (incomeYear: string) => void;
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

  setFullTimeResult: (fullTimeResult: IFulltime) => void;
}

const initialState = {
  employmentType: "full-time",
  incomeYear: "2024",
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

  fullTimeResult: {
    incomeYear: "",
    incomeType: "",
    activeSalaryTypeTab: "",
    income: 0,
    activeResidentTab: "",
    superRate: 0,
    deductions: 0,
    taxCredits: 0,
    holdPrivateInsurance: false,
  },
  partTimeResult: {
    hourlyWage: 0,
    hoursPerWeek: 0,
    weeksPerYear: 0,
    deductions: 0,
    taxCredits: 0,
  },
  casualResult: {
    hourlyWage: 0,
    totalHours: 0,
    deductions: 0,
    taxCredits: 0,
  },
  contractorResult: {
    dailyRate: 0,
    totalDays: 0,
    businessExpenses: 0,
    taxCredits: 0,
  },
  multiworksResult: [],
  canAddResult: true,
};

const useTaxStore = create<TaxState>((set) => ({
  ...initialState,
  reset: () => {
    set(initialState);
  },
  setEmploymentType: (employmentType) => set(() => ({ employmentType })),
  setIncomeYear: (incomeYear) => set(() => ({ incomeYear })),
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
}));

export default useTaxStore;
