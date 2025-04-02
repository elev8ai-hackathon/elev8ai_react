import { Radar } from "react-chartjs-2";
import { Card } from "@/components/ui/Card";

export const SpiderChartData = () => {
  const spiderData = {
    labels: ["Clarity", "Accuracy", "Helpfulness", "Speed", "Creativity"],
    datasets: [
      {
        label: "AI Performance",
        data: [90, 0, 95, 48, 92],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="row-span-1 col-span-7 h-full flex flex-col">
      <h3 className="text-purple-800 font-bold text-xl mb-2">
        Performance Metrics
      </h3>
      <Card className="p-4 rounded-xl grow overflow-auto flex justify-center">
        <Radar
          data={spiderData}
          options={{
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
              },
            },
          }}
        />
      </Card>
    </div>
  );
};
