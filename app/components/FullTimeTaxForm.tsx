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
import { useState } from "react";

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
  superRate: z.string(),
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
});

export function FullTimeTaxForm() {
  const [activeSalaryTypeTab, setActiveSalaryTypeTab] = useState("Base salary");
  const [activeResidentTab, setActiveResidentTab] = useState(
    "Australian resident"
  );
  const {
    incomeType,
    setIncomeType,
    setfullTimeIncome,
    setFullTimeDeductions,
    setFullTimeTaxCredits,
    setFullTimeResult,
  } = useTaxStore();

  const handleTabClick = (tabName: string) => {
    setActiveSalaryTypeTab(tabName);
  };

  const handleResidentTabClick = (tabName: string) => {
    setActiveResidentTab(tabName);
  };

  const getTabClass = (tabName: string) => {
    return tabName === activeSalaryTypeTab
      ? "px-2 cursor-pointer rounded-md bg-themePrimaryHover flex justify-center pt-1 lg:pt-2.5"
      : "px-2 cursor-pointer rounded-md hover:bg-themePrimaryHover flex justify-center pt-1 lg:pt-2.5";
  };

  const getResidentTabClass = (tabName: string) => {
    return tabName === activeResidentTab
      ? "px-2 cursor-pointer rounded-md bg-themePrimaryHover flex justify-center pt-1 lg:pt-2.5"
      : "px-2 cursor-pointer rounded-md hover:bg-themePrimaryHover flex justify-center pt-1 lg:pt-2.5";
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFullTimeResult(data);
  }

  const dynamicIncomeType =
    incomeType.charAt(0).toUpperCase() + incomeType.slice(1) || "Annually";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="w-2/3 space-y-6 pt-4"
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
              <div className="grid grid-rows-3 lg:grid-rows-1 lg:grid-flow-col w-[100%] lg:w-[100%] h-[90px] lg:h-[40px] text-sm rounded-md bg-themePrimary text-white border-slate-200 border-[1px]">
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
          <div className="grid grid-rows-3 lg:grid-rows-1 lg:grid-flow-col w-[100%] lg:w-[100%] h-[90px] lg:h-[44px] text-sm rounded-md bg-themePrimary text-white border-slate-200 border-[1px]">
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
              Working holiday makers
            </div>
          </div>
        </FormItem>
        <FormField
          control={form.control}
          name="superRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Super rate</FormLabel>
              <FormControl>
                <Input
                  placeholder="10.5"
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

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Tax deductions, credits and concessions
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button variant="formSubmit" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
