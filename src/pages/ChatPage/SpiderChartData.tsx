/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
  const [isSubCategory, setIsSubCategory] = useState(false);

  const resetChart = () => {
    setIsSubCategory(false);
  };

  const data = [
    {
      subject: "Math",
      A: 120,
    },
    {
      subject: "Chinese",
      A: 98,
    },
    {
      subject: "English",
      A: 86,
    },
    {
      subject: "Geography",
      A: 99,
    },
    {
      subject: "Physics",
      A: 85,
    },
    {
      subject: "History",
      A: 65,
    },
    {
      subject: "Opt",
      A: 65,
    },
    {
      subject: "Botle",
      A: 122,
    },
  ];
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
          <RadarChart outerRadius={150} width={730} height={400} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" allowDuplicatedCategory />
            <PolarRadiusAxis angle={51} domain={[0, 150]} />
            <Radar
              name="Mike"
              dataKey="A"
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
