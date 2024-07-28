"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import useTaxStore from "@/app/store/useStore";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import superRatesList from "@/app/data/superRates.json";
import { getTaxableIncomeAnnually } from "../utils/getTaxableIncomeAnnually";
import { getIncomeTaxPayable } from "../utils/getIncomeTaxPayable";

const FormSchema = z.object({
  incomeType: z
    .string()
    .min(1, "Please select an income type.")
    .default("annually"),
  income: z
    .string()
    .min(1, "Please input the income.")
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Income must be a number.",
    })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, {
      message: "Income value must be non-negative",
    }),
  superRate: z.number().refine((val) => val >= 0, {
    message: "Super rate must be non-negative",
  }),
  deductions: z
    .string()
    .optional()
    .default("0")
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Deductions must be a number.",
    })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, {
      message: "Deductions must be non-negative",
    }),
  taxCredits: z
    .string()
    .optional()
    .default("0")
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Tax credits and concessions must be a number.",
    })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, {
      message: "Tax credits and concessions must be non-negative",
    }),
  holdPrivateInsurance: z.boolean().default(false).optional(),
});

export function FullTimeTaxForm() {
  const [activeSalaryTypeTab, setActiveSalaryTypeTab] = useState("Base salary");
  const [activeResidentTab, setActiveResidentTab] = useState(
    "Australian resident"
  );
  const {
    employmentType,
    incomeType,
    incomeYear,
    setIncomeType,
    fullTimeIncome,
    setfullTimeIncome,
    setFullTimeDeductions,
    setFullTimeTaxCredits,
    setFullTimeResult,
  } = useTaxStore();

  const getIncomeYearSuperRate = (incomeYear: string): number => {
    const foundData = superRatesList.find((data) => data.value === incomeYear);
    if (!foundData) {
      throw new Error(`No super rate found for income year: ${incomeYear}`);
    }
    return foundData.rate;
  };

  const currentSuperRate = getIncomeYearSuperRate(incomeYear);

  const handleTabClick = (tabName: string) => {
    setActiveSalaryTypeTab(tabName);
  };

  const handleResidentTabClick = (tabName: string) => {
    setActiveResidentTab(tabName);
  };

  const getTabClass = (tabName: string) => {
    return tabName === activeSalaryTypeTab
      ? "px-2 cursor-pointer rounded-md bg-themePrimaryHover flex justify-center pt-1 xl:pt-2.5"
      : "px-2 cursor-pointer rounded-md hover:bg-themePrimaryHover flex justify-center pt-1 xl:pt-2.5";
  };

  const getResidentTabClass = (tabName: string) => {
    return tabName === activeResidentTab
      ? "cursor-pointer rounded-md bg-themePrimaryHover flex justify-center pt-1 xl:pt-3.5 text-xs"
      : "cursor-pointer rounded-md hover:bg-themePrimaryHover flex justify-center pt-1 xl:pt-3.5  text-xs";
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      superRate: currentSuperRate,
      holdPrivateInsurance: false,
    },
  });
  useEffect(() => {
    form.setValue("superRate", getIncomeYearSuperRate(incomeYear));
  }, [incomeYear, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const fullData = {
      ...data,
      incomeYear,
      activeSalaryTypeTab,
      activeResidentTab,
      employmentType,
    };

    setFullTimeResult(fullData);
    const abc = getIncomeTaxPayable(
      fullTimeIncome,
      incomeYear,
      activeResidentTab
    );
  }

  const dynamicIncomeType =
    incomeType.charAt(0).toUpperCase() + incomeType.slice(1) || "Annually";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="w-2/3 space-y-6 pt-4 "
      >
        <FormField
          control={form.control}
          name="incomeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pay cycle *</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setIncomeType(value);
                }}
                defaultValue={"annually"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select a income type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{`${dynamicIncomeType} salary *`}</FormLabel>
              <div className="grid grid-rows-3 xl:grid-rows-1 xl:grid-flow-col w-[100%] xl:w-[120%] h-[90px] xl:h-[40px] text-sm rounded-md bg-themePrimary text-white border-slate-200 border-[1px]">
                <div
                  className={getTabClass("Base salary")}
                  onClick={() => handleTabClick("Base salary")}
                >
                  Base salary
                </div>
                <div
                  className={getTabClass("Package")}
                  onClick={() => handleTabClick("Package")}
                >
                  Package
                </div>
                <div
                  className={getTabClass("In hand")}
                  onClick={() => handleTabClick("In hand")}
                >
                  In hand
                </div>
              </div>
              <FormControl>
                <Input
                  placeholder="$0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setfullTimeIncome(parseFloat(e.target.value) || 0);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Resident type *</FormLabel>
          <div className="grid grid-rows-3 xl:grid-rows-1 xl:grid-flow-col w-[100%] xl:w-[120%] h-[90px] xl:h-[44px] xl:text-sm rounded-md bg-themePrimary text-white border-slate-200 border-[1px]">
            <div
              className={getResidentTabClass("Australian resident")}
              onClick={() => handleResidentTabClick("Australian resident")}
            >
              Australian resident
            </div>
            <div
              className={getResidentTabClass("Foreign resident")}
              onClick={() => handleResidentTabClick("Foreign resident")}
            >
              Foreign resident
            </div>
            <div
              className={getResidentTabClass("Working holiday makers")}
              onClick={() => handleResidentTabClick("Working holiday makers")}
            >
              working holiday
            </div>
          </div>
        </FormItem>
        <FormField
          control={form.control}
          name="superRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Super rate *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    // setFullTimeDeductions(parseFloat(e.target.value) || 0);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col">
          <Accordion type="single" collapsible className="w-[120%]">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Tax deductions, credits and concessions
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="deductions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deductions</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="$0"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setFullTimeDeductions(
                                parseFloat(e.target.value) || 0
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="taxCredits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax credits and concessions</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="$0"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setFullTimeTaxCredits(
                                parseFloat(e.target.value) || 0
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-[120%]">
            <AccordionItem value="item-1">
              <AccordionTrigger>Medicare levy surcharge</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="holdPrivateInsurance"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm">
                          Private hospital cover
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Button variant="formSubmit" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
