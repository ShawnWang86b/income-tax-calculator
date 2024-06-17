"use client";

import useTaxStore from "@/app/store/useStore";
import { getCasualTaxResult } from "@/app/utils/getCasualTaxResult";
import { formatNumber } from "@/app/utils/formatNumber";
import { getIncomeRank } from "@/app/utils/getIncomeRank";

export function CasualTable() {
  const { casualResult } = useTaxStore();
  const { hourlyWage, totalHours, deductions, taxCredits } = casualResult;

  const casualTaxResult = getCasualTaxResult(
    hourlyWage,
    totalHours,
    deductions,
    taxCredits
  );
  const netIncome =
    casualTaxResult.taxableIncome -
    casualTaxResult.taxPayable -
    casualTaxResult.levy;
  const rankPercentage = getIncomeRank(netIncome);
  return (
    <section className="flex flex-col gap-2 border">
      <div className="flex flex-col gap-2 bg-[#874ac4] text-white p-6">
        <h2>The annual estimated tax on your taxable income is</h2>
        <p className="font-bold text-2xl">
          ${formatNumber(Math.round(casualTaxResult.taxPayable))}
        </p>
        <p>
          Your net income exceeds that of {(100 - rankPercentage).toFixed(1)}%
          of the users in our system
        </p>
      </div>
      <div className="p-6">
        <p className="text-2xl pb-8">Summary</p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between font-bold ">
            <p>Your taxable income:</p>
            <p>${formatNumber(Math.round(casualTaxResult.taxableIncome))}</p>
          </div>
          <div className="flex justify-between">
            <p>Income tax payable:</p>
            <p>${formatNumber(Math.round(casualTaxResult.taxPayable))}</p>
          </div>

          <div className="flex justify-between">
            <p>Medicare levy payable:</p>
            <p>${formatNumber(Math.round(casualTaxResult.levy))}</p>
          </div>

          <div className="flex justify-between font-bold">
            <p>Your income after tax & Medicare levy:</p>
            <p>${formatNumber(Math.round(netIncome))}</p>
          </div>
        </div>
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* month */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between font-bold ">
            <p>Your monthly taxable income:</p>
            <p>
              ${formatNumber(Math.round(casualTaxResult.monthlyTaxableIncome))}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Monthly income tax payable:</p>
            <p>
              ${formatNumber(Math.round(casualTaxResult.monthlyTaxPayable))}
            </p>
          </div>

          <div className="flex justify-between">
            <p>Monthly Medicare levy payable:</p>
            <p>${formatNumber(Math.round(casualTaxResult.monthlylevy))}</p>
          </div>

          <div className="flex justify-between font-bold">
            <p>Your monthly income after tax & Medicare levy:</p>
            <p>
              $
              {formatNumber(
                Math.round(
                  casualTaxResult.monthlyTaxableIncome -
                    casualTaxResult.monthlyTaxPayable -
                    casualTaxResult.monthlylevy
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
