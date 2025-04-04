import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCandidatesList } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "@tanstack/react-router";

const selectUserFormSchema = z.object({
  user: z.string(),
});

type SelectUserObj = z.infer<typeof selectUserFormSchema>;
export const UserList = () => {
  const { data: candidates } = useCandidatesList();

  const router = useRouter();
  const form = useForm<SelectUserObj>({
    resolver: zodResolver(selectUserFormSchema),
    defaultValues: {},
  });

  const onSubmit = async (value: SelectUserObj) => {
    router.navigate({ to: "/user-summary", search: { email: value.user } });
  };

  return (
    <div className="flex items-center justify-center p-20 h-full">
      <Card className=" w-[600px] min-h-96 grid grid-rows-[auto_1fr]">
        <CardHeader>
          <CardTitle className="text-center">Gap Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-col flex space-y-8 h-full"
            >
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => {
                  return (
                    <FormItem className="p-20">
                      <FormLabel>Candidates *</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Candidate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Candidates</SelectLabel>
                              {candidates?.emails.map((users) => (
                                <SelectItem key={users} value={users}>
                                  {users.split("@")[0]}
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
