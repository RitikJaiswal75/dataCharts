import { useState } from "react";
import { ChartSchema } from "@/types/chartData";
import { initialChartsData } from "@/constants/initialData";
import CreateCharts from "./CreateCharts";
import Chart from "./Chart";

function MainComponent() {
    const [charts, setCharts] = useState<Array<ChartSchema>>(initialChartsData);

    const createAtIndex = (index: number) => {
        const finalCharts: Array<ChartSchema> = [
            ...charts.slice(0, index),
            {
                component: "create",
                metric: "daily-active-users",
                metricName: "Daily Active Users",
                segmentId: "india",
                segmentKey: "country",
                segmentName: "India",
            },
            ...charts.slice(index),
        ];
        setCharts(finalCharts);
    };

    const editCurrentChart = (index: number, chartData?: ChartSchema) => {
        const finalCharts = [...charts];
        finalCharts[index] = {
            ...charts[index],
            ...chartData,
        };
        setCharts(finalCharts);
    };

    return (
        <div
            className={`rounded-2xl grid grid-cols-3 bg-white w-[95%] mx-auto my-12`
            }
        >
            {
                charts.map((chart, index) => {
                    return chart.component === "chart" ? (
                        <Chart
                            chartData={chart}
                            index={index}
                            key={index}
                            createNewChart={(creationIndex: number) => {
                                createAtIndex(creationIndex);
                            }
                            }
                            editCurrentChart={(editIndex: number, chartData: ChartSchema) => {
                                editCurrentChart(editIndex, chartData);
                            }}
                        />
                    ) : (
                        <CreateCharts
                            chartData={chart}
                            index={index}
                            key={index}
                            addChartToIndex={(index: number, chartData: ChartSchema) =>
                                editCurrentChart(index, chartData)
                            }
                        />
                    );
                })}
        </div>
    );
}

export default MainComponent;
