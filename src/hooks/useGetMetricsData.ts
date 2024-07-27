import { getMetrics } from "@/network/apiCalls";
import { MetricSchema } from "@/types/apiData";
import { useEffect, useState } from "react";

const useGetMetricsData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<Array<MetricSchema> | null>(null);

    useEffect(() => {
        getMetrics()
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

export default useGetMetricsData;
