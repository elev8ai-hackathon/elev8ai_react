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

export const CompetencyMatches = () => {
  const search = useSearch({ strict: false });

  const { data } = useCandidateSummary((search as any).email);
  console.log("🚀 ~ CompetencyMatches ~ data:", data);

  return (
    <div className="col-span-7 row-span-2 order-first">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Competency Matches And Areas oF Improvements:</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto fancy-scrollbar">
          <CardDescription className="font-semibold text-lg text-black  mb-1">
            Competency Matches
          </CardDescription>
          <div className="pl-1 mb-8">
            {data?.competency_matches &&
              Object.entries(data.competency_matches).map(
                ([competency, desc]) => {
                  return (
                    <div key={competency} className="mb-3 text-sm">
                      <CardDescription className="font-semibold text-base underline underline-offset-2 mb-1">
                        {competency}
                      </CardDescription>
                      <p className="flex gap-1">
                        <Label className="leading-5">Match Percentage:</Label>
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
                      <Label className="leading-5">Feedback:</Label>{" "}
                      {improvementsArea.feedback}
                    </p>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
