"use client";

import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useChartConfig from "@/hooks/useChartConfig";
import { ChartComponentProps } from "@/types/componentProps";

const Chart = ({
    chartData,
    index,
    createNewChart,
    editCurrentChart,
}: ChartComponentProps) => {
    const { metric, metricName, segmentId, segmentKey, segmentName } = chartData;

    const [showAddBtn, setShowAddBtn] = useState(false);

    const {
        config: options,
        weekChange,
        latestValue,
    } = useChartConfig({
        metric,
        segmentId,
        segmentKey,
    });

    return (
        <div
            className="p-4 relative"
            onClick={() => {
                editCurrentChart(index, {
                    component: "create",
                    metric,
                    metricName,
                    segmentId,
                    segmentKey,
                    segmentName,
                });
            }}
            onMouseEnter={() => {
                setShowAddBtn(true);
            }}
            onMouseLeave={() => {
                setShowAddBtn(false);
            }}
        >
            {(index + 1) % 3 !== 0 ? (
                <div className="absolute h-[80%] w-[1px] bg-slate-400 right-0"></div>
            ) : null}
            <button
                className={`absolute left-[-11px] top-[47%] h-5 w-5 bg-teal-600 text-white rounded-full flex items-center justify-center p-0 m-0 ${showAddBtn ? "" : "hidden"
                    }`}
                onClick={(e) => {
                    e.stopPropagation();
                    createNewChart(index);
                }}
            >
                +
            </button>
            <button
                className={`absolute p-0 m-0 right-[-9px] top-[47%] h-5 w-5 bg-teal-600 text-white rounded-full flex items-center justify-center ${showAddBtn ? "" : "hidden"
                    }`}
                onClick={(e) => {
                    e.stopPropagation();
                    createNewChart(index + 1);
                }}
            >
                +
            </button>
            <h2 className="text-lg font-semibold mb-2">
                {metricName}, {segmentName}
            </h2>
            <div className="flex w-[98%] border-slate-400">
                <div className="flex flex-col justify-between w-[30%] ">
                    <div></div>
                    <div className="flex flex-col items-baseline mb-4 items-center justify-center">
                        <span className="text-3xl font-bold">
                            {latestValue.toLocaleString("en-IN", {
                                notation: "compact",
                                compactDisplay: "short",
                            })}
                        </span>
                        <span
                            className={`ml-2 text-sm ${weekChange >= 0 ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {weekChange >= 0 ? "↑" : "↓"} {Math.abs(weekChange)}% Δ7d
                        </span>
                    </div>
                </div>
                <div className="w-[70%]">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Chart;
