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
import { Input } from "@/components/ui/input";
import useTaxStore from "@/app/store/useStore";

const FormSchema = z.object({
  incomeType: z.string({
    required_error: "Please select an income type.",
  }),
  income: z
    .string({ required_error: "Please input the income." })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Income must be a number.",
    })
    .transform((val) => parseFloat(val)),
  deductions: z
    .string({ required_error: "Please input the deductions." })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Income must be a number.",
    })
    .transform((val) => parseFloat(val)),
  taxCreditsAndConcessions: z
    .string({ required_error: "Please input the taxCreditsAndConcessions." })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Income must be a number.",
    })
    .transform((val) => parseFloat(val)),
});

export function FullTimeTaxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  const {
    employmentType,
    incomeType,
    fullTimeAnnuallySalary,
    fullTimeMonthlySalary,
    fullTimeDailySalary,
    fullTimeDeductions,
    fullTimeTaxCredits,
    setEmploymentType,
    setIncomeType,
    setFullTimeAnnuallySalary,
    setFullTimeMonthlySalary,
    setFullTimeDailySalary,
    setFullTimeDeductions,
    setFullTimeTaxCredits,
    reset,
  } = useTaxStore();

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
              <FormLabel>Pay cycle</FormLabel>
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
              <FormLabel>{`${dynamicIncomeType} salary`}</FormLabel>
              <FormControl>
                <Input placeholder="Income" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deductions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deductions</FormLabel>
              <FormControl>
                <Input placeholder="Deductions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxCreditsAndConcessions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Credits And Concessions</FormLabel>
              <FormControl>
                <Input placeholder="Tax Credits And Concessions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="formSubmit" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
