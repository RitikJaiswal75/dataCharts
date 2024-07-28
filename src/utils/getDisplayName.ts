import { MetricSchema, segmentValuesSchema } from "@/types/apiData";

export function getDisplayNameFromSegmentID(
    id: string,
    list: Array<segmentValuesSchema>
) {
    return (
        list?.find((item) => item.segmentId === id)?.displayName || "Unknown Metric"
    );
}

export function getDisplayNameFromMetricID(
    id: string,
    list: Array<MetricSchema>
) {
    return list?.find((item) => item.id === id)?.displayName || "Unknown Metric";
}
