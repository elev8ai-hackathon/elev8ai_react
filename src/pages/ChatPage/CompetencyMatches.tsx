/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useCandidateSummary } from "@/services";
import { useSearch } from "@tanstack/react-router";

import { Loader } from "lucide-react";
export const CompetencyMatches = () => {
  const search = useSearch({ strict: false });

  const { data, isLoading, isPending } = useCandidateSummary(
    (search as any).email
  );

  return (
    <div className="col-span-7 row-span-2 order-first">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Competency Matches And Areas oF Improvements:</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto fancy-scrollbar">
          {isLoading || isPending ? (
            <div className="h-full flex items-center justify-center ">
              <Loader className="animate-spin size-12 " />
            </div>
          ) : (
            <>
              {data?.final_match && (
                <CardDescription className="font-semibold text-lg text-black  mb-1">
                  Final Match: {data?.final_match}%
                </CardDescription>
              )}
              <CardDescription className="font-semibold text-lg text-black  mb-1">
                Competency Matches
              </CardDescription>
              <div className="pl-1 mb-8">
                {data?.competency_matches &&
                  Object.entries(data.competency_matches).map(
                    ([name, desc]) => {
                      return (
                        <div key={name} className="mb-3 text-sm">
                          <CardDescription className="font-semibold text-base underline underline-offset-2 mb-1">
                            {name}
                          </CardDescription>
                          <p className="flex gap-1">
                            <Label className="leading-5">
                              Match Percentage:
                            </Label>
                            {desc.match_percentage}%
                          </p>
                          <p className="flex gap-1 items-start">
                            <Label className="leading-5">Reasoning:</Label>{" "}
                            {desc.description}
                            {desc.reasoning}
                          </p>
                        </div>
                      );
                    }
                  )}
              </div>

              <CardDescription className="font-semibold text-lg text-black  mb-1">
                Areas of Improvements:
              </CardDescription>

              <div className="pl-1 mb-8">
                {data?.areas_of_improvement &&
                  data.areas_of_improvement.map((improvementsArea) => {
                    return (
                      <div
                        key={improvementsArea.competency}
                        className="mb-3 text-sm"
                      >
                        <CardDescription className="font-semibold text-base underline underline-offset-2 mb-1">
                          {improvementsArea.competency}
                        </CardDescription>

                        <p className="flex gap-1 items-start">
                          {improvementsArea.feedback}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
