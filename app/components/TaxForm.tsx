"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

const FormSchema = z.object({
  EmploymentType: z.string({
    required_error: "Please select an employment type.",
  }),
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

export function TaxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="EmploymentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type Selection</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a employment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="incomeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income Type Selection</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a income type" />
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
              <FormLabel>Income</FormLabel>
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
