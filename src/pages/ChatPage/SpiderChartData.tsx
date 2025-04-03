/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TimerReset } from "lucide-react";
import { useState } from "react";
import { Radar } from "react-chartjs-2";

const getDataSet = (
  labels: string[],
  data: number[],
  label: string,
  isSubCategory?: boolean
) => {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: isSubCategory
          ? "rgba(99, 12, 241, 0.2)"
          : "rgba(99, 102, 241, 0.2)",
        borderColor: isSubCategory
          ? "rgba(99, 12, 241, 1)"
          : "rgba(99, 102, 241, 1)",
        borderWidth: 2,
      },
    ],
  };
};

export const SpiderChartData = () => {
  const mainData = getDataSet(
    [
      "Technical skills",
      "Delivery",
      "Feedback",
      "Leadership",
      "Strategic Impact",
    ],
    [90, 30, 95, 48, 92],
    "Category"
  );

  const [dataset, setDataSet] = useState(mainData);
  const [isSubCategory, setIsSubCategory] = useState(false);

  const subCategoryData = {
    "Technical skills": {
      labels: ["a", "b", "c", "d", "e"],
      dataset: [50, 80, 60, 75, 90],
    },
    Delivery: {
      labels: ["a", "b", "c", "d", "e"],
      dataset: [40, 85, 70, 65, 80],
    },
    Feedback: {
      labels: ["a", "b", "c", "d", "e"],
      dataset: [55, 65, 85, 90, 95],
    },
    Leadership: {
      labels: ["a", "b", "c", "d", "e"],
      dataset: [60, 75, 80, 70, 85],
    },
    "Strategic Impact": {
      labels: ["a", "b", "c"],
      dataset: [70, 80, 60],
    },
  };

  const handleClick = (
    _event: React.MouseEvent<HTMLCanvasElement>,
    elements: any[]
  ) => {
    console.log("🚀 ~ SpiderChartData ~ elements:", elements);
    if (!elements.length) return;

    // Get the clicked data point index
    const index = elements[0].index;
    const category = mainData.labels[index];

    if (category && subCategoryData[category] && !isSubCategory) {
      console.log(category);
      setIsSubCategory(true);
      setDataSet(
        getDataSet(
          subCategoryData[category].labels,
          subCategoryData[category].dataset,
          category
        )
      );
    }
  };

  const resetChart = () => {
    setDataSet(mainData);
    setIsSubCategory(false);
  };

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
          <Radar
            data={dataset}
            options={{
              onClick: handleClick,
              layout: {
                padding: 1,
                autoPadding: false,
              },
              plugins: {
                legend: {
                  display: true,
                  position: "top",
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
