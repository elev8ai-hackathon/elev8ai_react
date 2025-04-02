import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export type MatrixData = {
  label: string;
  reasoning: string;
  matchPercent: number;
};

interface CompetencyMatchesProps {
  data: MatrixData[];
}
export const CompetencyMatches = ({ data }: CompetencyMatchesProps) => {
  return (
    <div className="col-span-7 row-span-1">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Competency Matches</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto fancy-scrollbar">
          <div className="pl-1">
            {data.map((item) => {
              return (
                <div key={item.label} className="mb-2">
                  <CardDescription className="font-semibold">
                    {item.label}
                  </CardDescription>
                  <p className="flex gap-1">
                    <Label>Match Percentage:</Label>
                    {item.matchPercent}%
                  </p>
                  <p className="flex gap-1">
                    <Label>Reasoning:</Label> {item.reasoning}
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
