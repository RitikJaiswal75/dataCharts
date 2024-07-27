import axios from "axios";

const baseURL = `https://sundial-fe-interview.vercel.app/api`;

const query = axios.create({ baseURL });

export const getMetrics = async () => {
    const response = await query.get(`/metrics`);
    return response;
};

export const getSegments = async () => {
    const response = await query.get(`/segments`);
    return response;
};

export const getTimeSeries = async (
    metric: string = "daily-active-users",
    segmentKey: string = "country",
    segmentId: string = "India"
) => {
    const body = {
        metric,
        segmentId,
        segmentKey,
    };
    const response = await query.post(`/snapshot`, { body });
    return response;
};
