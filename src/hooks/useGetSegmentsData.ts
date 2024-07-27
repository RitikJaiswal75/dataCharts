import { getSegments } from "@/network/apiCalls";
import { SegmentDataSchema } from "@/types/apiData";
import { useEffect, useState } from "react";

const useGetSegmentsData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<Array<SegmentDataSchema> | null>(null);

    useEffect(() => {
        getSegments()
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

export default useGetSegmentsData;
