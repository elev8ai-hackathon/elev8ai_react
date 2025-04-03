import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Radar } from "react-chartjs-2";

export const SpiderChartData = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const spiderData = {
    labels: [
      "Technical skills",
      "Delivery",
      "Feedback",
      "Leadership",
      "Strategic Impact",
    ],
    datasets: [
      {
        label: "Category",
        data: [90, 30, 95, 48, 92],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
      },
    ],
  };

  const subCategoryData = {
    "Technical skills": [50, 80, 60, 75, 90], // Example: Speed broken into sub-metrics
    Delivery: [40, 85, 70, 65, 80],
    Feedback: [55, 65, 85, 90, 95],
    Leadership: [60, 75, 80, 70, 85],
    "Strategic Impact": [70, 80, 60, 90, 85],
  };

  const handleClick = (
    _event: React.MouseEvent<HTMLCanvasElement>,
    elements: any[]
  ) => {
    console.log(elements);
    if (!elements.length) return;

    // Get the clicked data point index
    const index = elements[0].index;
    const category = spiderData.labels[index];

    if (category && subCategoryData[category]) {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="row-span-3 col-span-7 h-full flex flex-col order-2">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Performance Graph</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto fancy-scrollbar flex justify-center">
          <Radar
            data={spiderData}
            options={{
              onClick(event, elements, chart) {
                console.log(event, elements, chart);
              },
              layout: {
                padding: 1,
                autoPadding: false,
              },
              plugins: {
                legend: {
                  display: false,
                  position: "left",
                  maxWidth: 100,
                },
              },
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
