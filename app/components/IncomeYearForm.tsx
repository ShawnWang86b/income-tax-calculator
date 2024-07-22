"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import useTaxStore from "@/app/store/useStore";
import superRates from "@/app/data/superRates.json";

const FormSchema = z.object({
  incomeYear: z.string().min(1, "Please select an income year."),
});

export function IncomeYearForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { setIncomeYear } = useTaxStore();

  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6" autoComplete="off">
        <FormField
          control={form.control}
          name="incomeYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select an income year *</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setIncomeYear(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="- Select -" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {superRates.map((superRate) => {
                    return (
                      <SelectItem value={superRate.value} key={superRate.label}>
                        {superRate.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
