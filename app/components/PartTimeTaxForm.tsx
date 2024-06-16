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
    .string({ required_error: "Please input the income." })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Income must be a number.",
    })
    .transform((val) => parseFloat(val)),
  hoursPerWeek: z
    .string({ required_error: "Please input the income." })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Income must be a number.",
    })
    .transform((val) => parseFloat(val)),
  weeksPerYear: z
    .string({ required_error: "Please input the income." })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Income must be a number.",
    })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 1 && val <= 52, {
      message: "Weeks per year must be between 1 and 52.",
    }),
  deductions: z
    .string()
    .optional()
    .default("0")
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Income must be a number.",
    })
    .transform((val) => parseFloat(val)),
  taxCredits: z
    .string()
    .optional()
    .default("0")
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Income must be a number.",
    })
    .transform((val) => parseFloat(val)),
});

export function PartTimeTaxForm() {
  const {
    employmentType,
    incomeType,
    partTimeHourlyWage,
    partTimeHoursPerWeek,
    partTimeWeeksPerYear,
    partTimeDeductions,
    partTimeTaxCredits,
    setPartTimeHourlyWage,
    setPartTimeHoursPerWeek,
    setPartTimeWeeksPerYear,
    setPartTimeDeductions,
    setPartTimeTaxCredits,
    setPartTimeResult,
    reset,
  } = useTaxStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setPartTimeResult(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
        autoComplete="off"
      >
        <div className="flex gap-2 pt-4">
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
                      setPartTimeHourlyWage(parseFloat(e.target.value) || 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hoursPerWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hours per week</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setPartTimeHoursPerWeek(parseFloat(e.target.value) || 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="weeksPerYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weeks per year</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setPartTimeWeeksPerYear(parseFloat(e.target.value) || 0);
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
                    setPartTimeDeductions(parseFloat(e.target.value) || 0);
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
                    setPartTimeTaxCredits(parseFloat(e.target.value) || 0);
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
