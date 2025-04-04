import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Title,
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
  Title,
  Legend
);

export function MainChat() {
  return (
    <div className="relative h-screen flex flex-col">
      <Header />

      <div className="h-screen grid grid-cols-12 overflow-auto grid-rows-5 gap-6 p-6 grid-flow-col">
        <RightSection />
        <CompetencyMatches data={mockCompetencyMatrix} />
        <SpiderChartData />
      </div>
    </div>
  );
}
