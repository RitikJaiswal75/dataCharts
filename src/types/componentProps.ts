import { MutableRefObject } from "react";
import { ChartSchema } from "./chartData";

export type ChartComponentProps = {
    chartData: ChartSchema;
    index: number;
    createNewChart: (index: number) => void;
    editCurrentChart: (index: number, data: ChartSchema) => void;
};

export type CreateOrEditChartProps = {
    chartData: ChartSchema;
    index: number;
    addChartToIndex: (index: number, data: ChartSchema) => void;
};

export type MetricDropdownProps = {
    selectedMetric: string;
    setSelectedMetric: (metricName: string) => void;
    selectedMetricName: MutableRefObject<string>;
};

export type SegmentDropdownProps = {
    selectedSegmentId: string;
    setSegmentId: (segmentId: string) => void;
    selectedSegmentName: MutableRefObject<string>;
};
