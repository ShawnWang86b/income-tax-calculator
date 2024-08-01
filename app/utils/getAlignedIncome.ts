export const getAlignedIncome = (
  income: number,
  incomeType: string,
  totalWorkingDays?: number,
  totalWorkingHours?: number
) => {
  let alignedIncome;
  switch (incomeType) {
    case "annually":
      alignedIncome = income;
      break;
    case "monthly":
      alignedIncome = income * 12;
      break;
    case "fortnightly":
      alignedIncome = income * 26;
      break;
    case "weekly":
      alignedIncome = income * 52;
      break;
    case "daily":
      alignedIncome = income * (totalWorkingDays ?? 0); // Use default value of 0 if undefined
      break;
    case "hourly":
      alignedIncome = income * (totalWorkingHours ?? 0); // Use default value of 0 if undefined
      break;
    default:
      alignedIncome = 0; // Handle unexpected incomeType
      break;
  }
  return alignedIncome;
};
