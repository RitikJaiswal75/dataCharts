export type segmentValuesSchema = {
    segmentId: string;
    displayName: string;
};

export type SegmentDataSchema = {
    segmentKey: string;
    displayName: string;
    values: Array<segmentValuesSchema>;
};

export type MetricSchema = {
    id: string;
    displayName: string;
    isPercentageMetric: false;
};
