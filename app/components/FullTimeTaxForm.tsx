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
  const {
    incomeType,
    setIncomeType,
    setfullTimeIncome,
    setFullTimeDeductions,
    setFullTimeTaxCredits,
    setFullTimeResult,
  } = useTaxStore();
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
                    setFullTimeDeductions(parseFloat(e.target.value) || 0);
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
                    setFullTimeTaxCredits(parseFloat(e.target.value) || 0);
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
