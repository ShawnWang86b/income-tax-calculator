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

import { Input } from "@/components/ui/input";
import useTaxStore from "@/app/store/useStore";

const FormSchema = z.object({
  income: z
    .string({ required_error: "Please input the income." })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Income must be a number.",
    })
    .transform((val) => parseFloat(val)),

  totalDays: z
    .string({ required_error: "Please input the days." })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Total Days must be a number.",
    })
    .transform((val) => parseFloat(val)),
  businessExpenses: z
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

export function ContractorTaxForm() {
  const {
    employmentType,
    incomeType,
    contractorDailyRate,
    contractorTotalDays,
    contractorBusinessExpenses,
    contractorTaxCredits,
    setContractorDailyRate,
    setContractorTotalDays,
    setContractorBusinessExpenses,
    setContractorTaxCredits,
    reset,
  } = useTaxStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 pt-4"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily rate</FormLabel>
              <FormControl>
                <Input
                  placeholder="Income"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Days</FormLabel>
              <FormControl>
                <Input
                  placeholder="Total Days"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessExpenses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Expenses</FormLabel>
              <FormControl>
                <Input
                  placeholder="Business Expenses"
                  {...field}
                  value={field.value ?? ""}
                />
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
                <Input
                  placeholder="Tax Credits And Concessions"
                  {...field}
                  value={field.value ?? ""}
                />
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
