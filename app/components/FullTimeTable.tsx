"use client";

import useTaxStore from "@/app/store/useStore";
import { getFullTimeTaxResult } from "@/app/utils/getFullTimeTaxResult";
import { formatNumber } from "@/app/utils/formatNumber";

export function FullTimeTable() {
  const { fullTimeResult } = useTaxStore();
  const {
    incomeYear,
    incomeType,
    income,
    activeResidentTab,
    deductions,
    taxCredits,
  } = fullTimeResult;

  const fullTimeTaxResult = getFullTimeTaxResult(
    incomeYear,
    incomeType,
    income,
    activeResidentTab,
    deductions,
    taxCredits
  );

  // annually income in hand
  const netIncome =
    fullTimeTaxResult.taxableIncome -
    fullTimeTaxResult.taxPayable -
    fullTimeTaxResult.levy;

  return (
    <section className="flex flex-col gap-2 border bg-muted">
      <div className="flex flex-col gap-2 bg-themePrimary text-white p-6">
        <h2>The annual estimated tax on your taxable income is</h2>
        <p className="font-bold text-2xl">
          ${formatNumber(Math.round(fullTimeTaxResult.taxPayable))}
        </p>
      </div>
      <div className="p-6">
        <p className="text-2xl pb-8">Summary</p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between font-bold ">
            <p>Your taxable income:</p>
            <p>${formatNumber(Math.round(fullTimeTaxResult.taxableIncome))}</p>
          </div>
          <div className="flex justify-between">
            <p>Income tax payable:</p>
            <p>${formatNumber(Math.round(fullTimeTaxResult.taxPayable))}</p>
          </div>

          <div className="flex justify-between">
            <p>Medicare levy payable:</p>
            <p>${formatNumber(Math.round(fullTimeTaxResult.levy))}</p>
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
              $
              {formatNumber(Math.round(fullTimeTaxResult.monthlyTaxableIncome))}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Monthly income tax payable:</p>
            <p>
              ${formatNumber(Math.round(fullTimeTaxResult.monthlyTaxPayable))}
            </p>
          </div>

          <div className="flex justify-between">
            <p>Monthly Medicare levy payable:</p>
            <p>${formatNumber(Math.round(fullTimeTaxResult.monthlylevy))}</p>
          </div>

          <div className="flex justify-between font-bold">
            <p>Your monthly income after tax & Medicare levy:</p>
            <p>
              $
              {formatNumber(
                Math.round(
                  fullTimeTaxResult.monthlyTaxableIncome -
                    fullTimeTaxResult.monthlyTaxPayable -
                    fullTimeTaxResult.monthlylevy
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
