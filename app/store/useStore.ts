import { create } from "zustand";

interface TaxState {
  employmentType: string;
  incomeType: string;
  deduction: number;
  taxCredit: number;
  reset: () => void;
  setEmploymentType: (employmentType: string) => void;
  setIncomeType: (incomeType: string) => void;
  setDeduction: (deduction: number) => void;
  setTaxCredit: (taxCredit: number) => void;
}

const initialState = {
  employmentType: "",
  incomeType: "",
  deduction: 0,
  taxCredit: 0,
};

const useTaxStore = create<TaxState>((set) => ({
  ...initialState,
  reset: () => {
    set(initialState);
  },
  setEmploymentType: (employmentType) => set(() => ({ employmentType })),
  setIncomeType: (incomeType) => set(() => ({ incomeType })),
  setDeduction: (deduction) => set(() => ({ deduction })),
  setTaxCredit: (taxCredit) => set(() => ({ taxCredit })),
}));

export default useTaxStore;
