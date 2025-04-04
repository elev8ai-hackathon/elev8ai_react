/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCandidateSummary } from "@/services";
import { useSearch } from "@tanstack/react-router";
import { TimerReset } from "lucide-react";
import { useState } from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
} from "recharts";

export const SpiderChartData = () => {
  const search = useSearch({ strict: false });
  const { data: sourceData } = useCandidateSummary((search as any).email);

  const [isSubCategory, setIsSubCategory] = useState(false);

  const resetChart = () => {
    setIsSubCategory(false);
  };

  const areaMatchData =
    sourceData?.area_matches &&
    Object.entries(sourceData.area_matches).map(([area, matchPercent]) => ({
      area,
      matchPercent,
    }));

  return (
    <div className="row-span-3 col-span-7 h-full flex flex-col order-2">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex gap-4 items-center">
            Performance Graph{" "}
            <Button
              onClick={resetChart}
              variant={"outline"}
              className={cn({ hidden: !isSubCategory })}
            >
              Reset <TimerReset />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto fancy-scrollbar flex justify-center">
          <RadarChart
            outerRadius={150}
            width={730}
            height={400}
            data={areaMatchData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="area" allowDuplicatedCategory />
            <PolarRadiusAxis angle={51} domain={[0, 100]} />
            <Radar
              name="Area"
              dataKey="matchPercent"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Legend />
            <Tooltip cursor={{ stroke: "#8884d8", strokeWidth: 2 }} />
          </RadarChart>
        </CardContent>
      </Card>
    </div>
  );
};
