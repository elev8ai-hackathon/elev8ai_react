import { Card } from "@/components/ui/Card";

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
    <div className="col-span-7 row-span-1 flex flex-col">
      <h3 className="text-purple-800 font-bold text-xl mb-2">
        Competency Matches
      </h3>
      <Card className="overflow-auto p-4 rounded-xl fancy-scrollbar grow">
        <div className="pl-1">
          {data.map((item) => {
            return (
              <div key={item.label} className="text-purple-600 mb-2">
                <h6 className="font-semibold text-purple-700">{item.label}</h6>
                <p>
                  <span className="mr-1">Match Percentage:</span>
                  {item.matchPercent}%
                </p>
                <p>
                  <span className="mr-1">Reasoning:</span> {item.reasoning}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
