import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Elev8Ai = () => {
  return (
    <div className="text-indigo-700 text-4xl font-bold text-right">
      Elev8 AI
    </div>
  );
};
export const Header = () => {
  return (
    <div className="sticky top-0 p-4 flex justify-between items-center">
      <div className="flex text-indigo-700 gap-4">
        <Avatar>
          <AvatarImage src="#" alt="@shadcn" />
          <AvatarFallback>RS</AvatarFallback>
        </Avatar>
        <p className="text-xl font-medium">Robin Shrestha</p>
        <div className="flex gap-2 items-center pl-2">
          <Badge
            variant={"outline"}
            className="border-indigo-800 text-indigo-800  px-4 rounded-full"
          >
            SE
          </Badge>
          <ArrowRightIcon />
          <Badge
            variant={"default"}
            className="bg-indigo-700 px-4 rounded-full"
          >
            SSE
          </Badge>
        </div>
      </div>
      <Elev8Ai />
    </div>
  );
};
