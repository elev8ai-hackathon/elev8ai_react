import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { CompetencyMatches, MatrixData } from "./CompetencyMatches";
import { RightSection } from "./RightSection";
import { SpiderChartData } from "./SpiderChartData";
import { Header } from "@/components/Header";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

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
