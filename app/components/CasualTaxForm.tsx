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
  hourlyWage: z
    .string({ required_error: "Please input the hourly wage." })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Hourly wage must be a number.",
    })
    .transform((val) => parseFloat(val)),
  totalHours: z
    .string({ required_error: "Please input the working total hours." })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Working total hours must be a number.",
    })
    .transform((val) => parseFloat(val)),
  deductions: z
    .string()
    .optional()
    .default("0")
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Deductions must be a number.",
    })
    .transform((val) => parseFloat(val)),
  taxCredits: z
    .string()
    .optional()
    .default("0")
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Tax credits and concessions must be a number.",
    })
    .transform((val) => parseFloat(val)),
});

export function CasualTaxForm() {
  const {
    setCasualHourlyWage,
    setCasualTotalHours,
    setCasualDeductions,
    setCasualTaxCredits,
    setCasualResult,
  } = useTaxStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setCasualResult(data);
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
          name="hourlyWage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hourly wage</FormLabel>
              <FormControl>
                <Input
                  placeholder="$0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setCasualHourlyWage(parseFloat(e.target.value) || 0);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total hours</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setCasualTotalHours(parseFloat(e.target.value) || 0);
                  }}
                />
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
                <Input
                  placeholder="$0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setCasualDeductions(parseFloat(e.target.value) || 0);
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
              <FormLabel>Tax Credits And Concessions</FormLabel>
              <FormControl>
                <Input
                  placeholder="$0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setCasualTaxCredits(parseFloat(e.target.value) || 0);
                  }}
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
