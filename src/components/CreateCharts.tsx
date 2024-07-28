import { useRef, useState } from "react";
import MetricDropdown from "./MetricDropdown";
import SegmentDropdown from "./segmentDropdown";
import { CreateOrEditChartProps } from "@/types/componentProps";

function CreateCharts({
    chartData,
    index,
    addChartToIndex,
}: CreateOrEditChartProps) {
    const [selectedMetric, setSelectedMetric] = useState(chartData?.metric);
    const [selectedSegmentId, setSegmentId] = useState(chartData?.segmentId);

    const selectedMetricName = useRef(chartData?.metricName);
    const selectedSegmentKey = useRef(chartData?.segmentKey);
    const selectedSegmentName = useRef(chartData?.segmentName);

    return (
        <div className="flex flex-col p-4 gap-3">
            <MetricDropdown
                selectedMetric={selectedMetric}
                setSelectedMetric={setSelectedMetric}
                selectedMetricName={selectedMetricName}
            />
            <SegmentDropdown
                selectedSegmentId={selectedSegmentId}
                setSegmentId={setSegmentId}
                selectedSegmentName={selectedSegmentName}
            />
            <div className="flex justify-between">
                <button
                    className="bg-red-300 py-1 leading-7 rounded-lg text-red-600 w-[45%]"
                    onClick={() => {
                        addChartToIndex(index, {
                            component: "chart",
                            metric: selectedMetric,
                            metricName: selectedMetricName.current,
                            segmentId: selectedSegmentId,
                            segmentKey: selectedSegmentKey.current,
                            segmentName: selectedSegmentName.current,
                        });
                    }}
                >
                    Cancel
                </button>
                <button
                    className="bg-teal-600 py-1 leading-7 rounded-lg text-white w-[45%]"
                    onClick={() => {
                        addChartToIndex(index, {
                            component: "chart",
                            metric: selectedMetric,
                            metricName: selectedMetricName.current,
                            segmentId: selectedSegmentId,
                            segmentKey: selectedSegmentKey.current,
                            segmentName: selectedSegmentName.current,
                        });
                    }}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default CreateCharts;
