export type ChartSchema = {
    component: "chart" | "create";
    metric: string;
    metricName: string;
    segmentId: string;
    segmentKey: string;
    segmentName: string;
};
