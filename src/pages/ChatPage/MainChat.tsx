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
import { CompetencyMatches } from "./CompetencyMatches";
import { RightSection } from "./RightSection";
import { SpiderChartData } from "./SpiderChartData";

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
    <div className="h-full grid grid-cols-12 overflow-auto grid-rows-5 gap-6 p-6 grid-flow-col">
      <RightSection />
      <CompetencyMatches />
      <SpiderChartData />
    </div>
  );
}
