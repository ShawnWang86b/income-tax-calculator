const medicareLevyThreshold = 24276;
export const getMedicareLevy = (income: number) => {
  if (income > medicareLevyThreshold) {
    return income * 0.02;
  }
  return 0;
};
