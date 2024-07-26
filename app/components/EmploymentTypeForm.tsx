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
import useTaxStore from "../store/useStore";

const FormSchema = z.object({
  EmploymentType: z.string().min(1, "Please select an employment type."),
});

export function EmploymentTypeForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { setEmploymentType } = useTaxStore();

  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6" autoComplete="off">
        <FormField
          control={form.control}
          name="EmploymentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment type *</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setEmploymentType(value);
                }}
                defaultValue={"full-time"}
              >
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
      </form>
    </Form>
  );
}
