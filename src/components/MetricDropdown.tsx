import { MutableRefObject } from "react";
import useGetMetricsData from "@/hooks/useGetMetricsData";
import { getDisplayNameFromMetricID } from "@/utils/getDisplayName";
import { MetricDropdownProps } from "@/types/componentProps";

function MetricDropdown({
    selectedMetric,
    setSelectedMetric,
    selectedMetricName,
}: MetricDropdownProps) {
    const { data: metric, isLoading } = useGetMetricsData();
    if (isLoading || !metric) return null;
    return (
        <select
            className="h-8 rounded bg-slate-100 px-2"
            onChange={(e) => {
                setSelectedMetric(e.target.value);
                selectedMetricName.current = getDisplayNameFromMetricID(
                    e.target.value,
                    metric
                );
            }}
        >
            {metric.map((metric: any, index: number) => {
                if (metric.id === selectedMetric) {
                    selectedMetricName.current == metric.displayName;
                }
                return (
                    <option
                        value={metric.id}
                        selected={metric.id === selectedMetric}
                        key={`${metric.id}-${index}`}
                    >
                        {metric.displayName}
                    </option>
                );
            })}
        </select>
    );
}

export default MetricDropdown;
