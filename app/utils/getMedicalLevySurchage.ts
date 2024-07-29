import medicareLevySurchargeRates from "@/app/data/medicareLevySurchargeRates.json";

export const getMedicalLevySurcharge = (
  income: number,
  incomeYear: string,
  activeResidentTab: string
) => {
  const levySurchargeBrackets = medicareLevySurchargeRates[incomeYear];

  if (!levySurchargeBrackets) {
    return 0;
  }
  let surcharge = 0;

  for (let i = 0; i < levySurchargeBrackets.length; i++) {
    const bracket = levySurchargeBrackets[i];
    const nextBracket = levySurchargeBrackets[i + 1];

    if (!nextBracket || income < nextBracket.threshold) {
      surcharge = income * bracket.rate;
      break;
    }
  }

  const medicalLevySurcharge =
    activeResidentTab === "Australian resident" ? surcharge : 0;

  return medicalLevySurcharge;
};
