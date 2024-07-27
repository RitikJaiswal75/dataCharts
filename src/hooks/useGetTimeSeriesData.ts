import { getTimeSeries } from "@/network/apiCalls";
import { useEffect, useState } from "react";

type TimeSeriesValuesData = { date: string; value: number };
type TimeSeriesData = { values: Array<TimeSeriesValuesData> };

const useGetTimeSeriesData = ({
    metric,
    segmentId,
    segmentKey,
}: {
    metric: string;
    segmentId: string;
    segmentKey: string;
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<TimeSeriesData | null>(null);

    useEffect(() => {
        getTimeSeries(metric, segmentKey, segmentId)
            .then((res) => {
                setData(res.data.data);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { isLoading, error, data };
};

export default useGetTimeSeriesData;
