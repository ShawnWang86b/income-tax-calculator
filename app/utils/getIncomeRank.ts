import data from "@/data.json";

interface User {
  username: string;
  annuallyIncome: number;
  uuid: string;
}
export const getIncomeRank = (annuallyIncome: number) => {
  // annuallyIncome means: user's income after tax
  const user = data.users;

  const sortedUsers = user.sort(
    (a: User, b: User) => b.annuallyIncome - a.annuallyIncome
  );

  // Find the rank of the provided income
  let rank = 1;
  for (let i = 0; i < sortedUsers.length; i++) {
    if (annuallyIncome < sortedUsers[i].annuallyIncome) {
      rank++;
    } else {
      break;
    }
  }

  // get the percentage
  const rankPercentage = ((rank - 1) / user.length) * 100;
  return rankPercentage;
};
