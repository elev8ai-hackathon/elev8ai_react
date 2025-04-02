import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar } from "react-chartjs-2";

export const SpiderChartData = () => {
  const spiderData = {
    labels: ["Clarity", "Accuracy", "Helpfulness", "Speed", "Creativity"],
    datasets: [
      {
        label: "AI Performance",
        data: [90, 30, 95, 48, 92],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="row-span-1 col-span-7 h-full flex flex-col">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Performance Graph</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto fancy-scrollbar flex justify-center">
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
        </CardContent>
      </Card>
    </div>
  );
};
