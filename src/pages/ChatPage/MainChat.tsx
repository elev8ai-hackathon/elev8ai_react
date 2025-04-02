import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { RightSection } from "./RightSection";
import { CompetencyMatches, MatrixData } from "./CompetencyMatches";
import { SpiderChartData } from "./SpiderChartData";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// const designationMap = {
//   p2: "Associate Software Engineer",
//   p3: "Software Engineer",
//   p4: "Senior Software Engineer",
//   p5: "Lead Engineer",
//   p6: "Principal Engineer",
//   p7: "Solution Architect",
// };

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

export const Header = () => {
  return (
    <div className="sticky top-0 p-4 flex justify-between items-center">
      <div className="flex text-purple-700 gap-6">
        <p className="text-xl font-semibold">Robin Shrestha</p>
        <div className="flex gap-2 items-center">
          <Badge
            variant={"outline"}
            className="border-purple-800 text-purple-800  px-4 rounded-full"
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
      <div className="text-purple-800 text-4xl font-bold text-right">
        Elev8 AI
      </div>
    </div>
  );
};
export function MainChat() {
  return (
    <div className="relative h-screen flex flex-col">
      <Header />

      <div className="h-screen grid grid-cols-12 overflow-auto grid-rows-2 gap-6 p-6">
        <CompetencyMatches data={mockCompetencyMatrix} />

        <RightSection />

        <SpiderChartData />
      </div>
    </div>
  );
}
