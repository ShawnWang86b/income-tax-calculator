"use client";

import useTaxStore from "@/app/store/useStore";
import { getPartTimeTaxResult } from "@/app/utils/getPartTimeTaxResult";
import { formatNumber } from "@/app/utils/formatNumber";

export function PartTimeTable() {
  const { partTimeResult } = useTaxStore();
  const { hourlyWage, hoursPerWeek, weeksPerYear, deductions, taxCredits } =
    partTimeResult;

  const partTimeTaxResult = getPartTimeTaxResult(
    hourlyWage,
    hoursPerWeek,
    weeksPerYear,
    deductions,
    taxCredits
  );

  return (
    <section className="flex flex-col gap-2 border">
      <div className="flex flex-col gap-2 bg-[#874ac4] text-white p-6">
        <h2>The annual estimated tax on your taxable income is</h2>
        <p className="font-bold text-2xl">
          ${formatNumber(Math.round(partTimeTaxResult.taxPayable))}
        </p>
      </div>
      <div className="p-6">
        <p className="text-2xl pb-8">Summary</p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between font-bold ">
            <p>Your taxable income:</p>
            <p>${formatNumber(Math.round(partTimeTaxResult.taxableIncome))}</p>
          </div>
          <div className="flex justify-between">
            <p>Income tax payable:</p>
            <p>${formatNumber(Math.round(partTimeTaxResult.taxPayable))}</p>
          </div>

          <div className="flex justify-between">
            <p>Medicare levy payable:</p>
            <p>${formatNumber(Math.round(partTimeTaxResult.levy))}</p>
          </div>

          <div className="flex justify-between font-bold">
            <p>Your income after tax & Medicare levy:</p>
            <p>
              $
              {formatNumber(
                Math.round(
                  partTimeTaxResult.taxableIncome -
                    partTimeTaxResult.taxPayable -
                    partTimeTaxResult.levy
                )
              )}
            </p>
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
              {formatNumber(Math.round(partTimeTaxResult.monthlyTaxableIncome))}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Monthly income tax payable:</p>
            <p>
              ${formatNumber(Math.round(partTimeTaxResult.monthlyTaxPayable))}
            </p>
          </div>

          <div className="flex justify-between">
            <p>Monthly Medicare levy payable:</p>
            <p>${formatNumber(Math.round(partTimeTaxResult.monthlylevy))}</p>
          </div>

          <div className="flex justify-between font-bold">
            <p>Your monthly income after tax & Medicare levy:</p>
            <p>
              $
              {formatNumber(
                Math.round(
                  partTimeTaxResult.monthlyTaxableIncome -
                    partTimeTaxResult.monthlyTaxPayable -
                    partTimeTaxResult.monthlylevy
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
