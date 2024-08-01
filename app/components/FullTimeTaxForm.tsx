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
import { OptionButton } from "./OptionButton";

const FormSchema = z.object({
  incomeType: z
    .string()
    .min(1, "Please select an income type.")
    .default("annually"),
  totalWorkingDays: z.number().refine((val) => val >= 0, {
    message: "Total working days must be non-negative",
  }),
  totalWorkingHours: z.number().refine((val) => val >= 0, {
    message: "Total working hours must be non-negative",
  }),
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
  holdPrivateInsurance: z.boolean().default(false),
});

export function FullTimeTaxForm() {
  const [activeSalaryTypeTab, setActiveSalaryTypeTab] = useState("Base salary");
  const [activeResidentTab, setActiveResidentTab] = useState(
    "Australian resident"
  );

  const {
    // employmentType,
    incomeType,
    incomeYear,
    setIncomeType,
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      totalWorkingDays: 0,
      totalWorkingHours: 0,
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
      // employmentType,
    };
    console.log("fullData", fullData);
    setFullTimeResult(fullData);
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
                  <SelectItem value="fortnightly">Fortnightly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
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
              <OptionButton
                options={["Base salary", "Package", "In hand"]}
                optionsText={["Base salary", "Package", "In hand"]}
                activeOption={activeSalaryTypeTab}
                setFunction={setActiveSalaryTypeTab}
              />
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
        {incomeType === "daily" && (
          <FormField
            control={form.control}
            name="totalWorkingDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total working days *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="260"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {incomeType === "hourly" && (
          <FormField
            control={form.control}
            name="totalWorkingHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total working hours *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="996"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {/* Resident type selected */}
        <OptionButton
          label={"Resident type *"}
          options={[
            "Australian resident",
            "Foreign resident",
            "Working holiday makers",
          ]}
          optionsText={[
            "Australian resident",
            "Foreign resident",
            "Working holiday makers",
          ]}
          activeOption={activeResidentTab}
          setFunction={setActiveResidentTab}
        />

        <FormField
          control={form.control}
          name="superRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Super rate *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(parseFloat(e.target.value));
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
                Tax deductions and concessions
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
