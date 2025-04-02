import { Card } from "@/components/ui/Card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fileSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size > 0, { message: "File cannot be empty" })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
  })
  .refine((file) => ["application/pdf"].includes(file.type), {
    message: "Only PDF files are allowed",
  });

export const uploadFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),

  position: z.string(),
  file: fileSchema.optional(),
});

const PositionOptions = [
  { label: "Associate Software Engineer", value: "P2" },
  { label: "Software Engineer", value: "P3" },
  { label: "Senior Software Engineer", value: "P4" },
  { label: "Lead Engineer", value: "P5" },
  { label: "Principle Engineer", value: "P6" },
  { label: "Solutions Architect", value: "P7" },
];

export const UploadForm = () => {
  const form = useForm<z.infer<typeof uploadFormSchema>>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {},
  });

  return (
    <div className="flex p-20 justify-center items-center h-screen">
      <Card className="bg-white border border-gray-300 p-8 w-[600px]">
        <div></div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((value) => {
              console.log(value);
            })}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Test@gmail.com" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jon Snow" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select A position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Positions</SelectLabel>
                            {PositionOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};
