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

export type MatrixData = {
  label: string;
  reasoning: string;
  matchPercent: number;
};

const mockCompetencyMatrix: MatrixData[] = [
  {
    label: "Clarity",
    reasoning: "The candidate's response was clear and concise.",
    matchPercent: 85,
  },
  {
    label: "Accuracy",
    reasoning: "The candidate's response was accurate and correct.",
    matchPercent: 90,
  },
  {
    label: "Relevance",
    reasoning: "The candidate's response was relevant to the question.",
    matchPercent: 80,
  },
  {
    label: "Depth",
    reasoning: "The candidate's response was detailed and comprehensive.",
    matchPercent: 88,
  },
  {
    label: "Coherence",
    reasoning: "The candidate's response was coherent and well-structured.",
    matchPercent: 92,
  },
  {
    label: "Grammar",
    reasoning:
      "The candidate's response was well-written and free of grammatical errors.",
    matchPercent: 95,
  },
];

export const CompetencyMatches = () => {
  const search = useSearch({ strict: false }); // defaults to current route

  const { data } = useCandidateSummary((search as any).email);
  console.log("🚀 ~ CompetencyMatches ~ data:", data);

  return (
    <div className="col-span-7 row-span-2 order-first">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Competency Matches</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto fancy-scrollbar">
          <div className="pl-1">
            {mockCompetencyMatrix.map((item) => {
              return (
                <div key={item.label} className="mb-2 text-sm">
                  <CardDescription className="font-semibold">
                    {item.label}
                  </CardDescription>
                  <p className="flex gap-1">
                    <Label className="leading-5">Match Percentage:</Label>
                    {item.matchPercent}%
                  </p>
                  <p className="flex gap-1 items-start">
                    <Label className="leading-5">Reasoning:</Label>{" "}
                    {item.reasoning}
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
