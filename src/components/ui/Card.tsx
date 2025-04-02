import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const Card = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn("bg-indigo-100/50 rounded-lg p-4", props.className)}
    />
  );
};
