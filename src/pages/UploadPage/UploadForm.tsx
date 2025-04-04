import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UploadFormSchema,
  uploadFormSchema,
} from "@/services/uploadForm.schema";

const PositionOptions = [
  { label: "Associate Software Engineer", value: "p2" },
  { label: "Software Engineer", value: "p3" },
  { label: "Senior Software Engineer", value: "p4" },
  { label: "Lead Engineer", value: "p5" },
  { label: "Principle Engineer", value: "p6" },
  { label: "Solutions Architect", value: "p7" },
];

export const UploadForm = () => {
  const form = useForm<z.infer<typeof uploadFormSchema>>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {},
  });

  const handleSubmit = async (value: UploadFormSchema) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("email", value.email);
    formData.append("position", value.position);
    Array.from(value.artifacts).forEach((file) => {
      formData.append("artifacts", file);
    });
    console.log(formData.get("artifacts"));

    await fetch("https://your-api.com/upload", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="h-full flex p-20 pt-8 relative justify-center items-center">
      <Card className=" w-[600px]">
        <CardHeader>
          <CardTitle>Upload Artifacts</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
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
                      <FormMessage />
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
                      <FormMessage />
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
                            <SelectValue placeholder="Select a position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Position</SelectLabel>
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
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="artifacts"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Artifacts</FormLabel>
                      <FormControl>
                        <Input
                          accept="application/pdf"
                          placeholder="Artifact.pdf"
                          type={"file"}
                          // {...field}
                          multiple
                          max={2}
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            // setSelectedFile(e.target.files?.[0] || null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="text-right">
                <Button
                  className="bg-indigo-700 hover:bg-indigo-700/75 "
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
