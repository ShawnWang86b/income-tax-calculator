"use client";

import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Cell,
} from "recharts";
import useTaxStore from "@/app/store/useStore";
import { getFullTimeTaxResult } from "@/app/utils/getFullTimeTaxResult";
import { formatNumber } from "@/app/utils/formatNumber";
import { getBaseSalary } from "@/app/utils/getBaseSalary";
import { useState, useCallback } from "react";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`$AU ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Chart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: null, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const { fullTimeResult } = useTaxStore();
  const {
    incomeYear,
    incomeType,
    income,
    activeSalaryTypeTab,
    activeResidentTab,
    superRate,
    deductions,
    taxCredits,
    holdPrivateInsurance,
  } = fullTimeResult;

  // Get annually base salary before tax
  const baseSalary = getBaseSalary(
    income,
    activeSalaryTypeTab,
    superRate,
    incomeYear,
    activeResidentTab,
    deductions
  );

  const fullTimeTaxResult = getFullTimeTaxResult(
    incomeYear,
    incomeType,
    baseSalary,
    activeResidentTab,
    deductions,
    taxCredits,
    holdPrivateInsurance
  );

  // annually income in hand
  const netIncome =
    fullTimeTaxResult.taxableIncome -
    fullTimeTaxResult.taxPayable -
    fullTimeTaxResult.levy;

  const data = [
    { name: "Net income", value: netIncome },
    { name: "Income tax ", value: fullTimeTaxResult.taxPayable },
    { name: "Medicare levy", value: fullTimeTaxResult.levy },
    {
      name: "Levy surcharge",
      value: fullTimeTaxResult.medicalLevySurcharge,
    },
  ];

  const COLORS = ["#1868DB", "#172B4D", "#000", "#078559"];

  return (
    <PieChart width={600} height={600} className="text-xs">
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default Chart;
