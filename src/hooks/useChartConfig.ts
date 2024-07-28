import Highcharts from "highcharts";
import { useEffect, useState } from "react";
import useGetTimeSeriesData from "./useGetTimeSeriesData";

const useChartConfig = ({
    metric,
    segmentId,
    segmentKey,
}: {
    metric: string;
    segmentId: string;
    segmentKey: string;
}) => {
    const [config, setConfig] = useState({});
    const [weekChange, setWeekChange] = useState<number>(0);
    const [latestValue, setLatestValue] = useState<number>(0);

    const { data: timeSeiresData, isLoading } = useGetTimeSeriesData({
        metric,
        segmentId,
        segmentKey,
    });

    const data = timeSeiresData?.values;

    useEffect(() => {
        if (data && !isLoading) {
            setLatestValue(data[data?.length - 1]?.value || 0);

            const weekAgoValue = data[data?.length - 8]?.value || 0;
            const weekChange = Number(
                (((latestValue - weekAgoValue) / weekAgoValue) * 100).toFixed(1)
            );

            setWeekChange(weekChange);

            setConfig({
                chart: {
                    type: "area",
                    backgroundColor: "transparent",
                    height: 120,
                    spacingBottom: 0,
                    spacingTop: 0,
                    spacingLeft: 0,
                    spacingRight: 0,
                },
                title: {
                    text: null,
                },
                xAxis: {
                    type: "datetime",
                    labels: {
                        enabled: false,
                    },
                    lineWidth: 0,
                    tickWidth: 0,
                },
                yAxis: {
                    title: {
                        text: null,
                    },
                    labels: {
                        enabled: false,
                    },
                    gridLineWidth: 0,
                },
                legend: {
                    enabled: false,
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1,
                            },
                            stops: [
                                [
                                    0,
                                    weekChange >= 0
                                        ? Highcharts.color("#4ade80").setOpacity(0.3).get("rgba")
                                        : Highcharts.color("#ff5d39").setOpacity(0.3).get("rgba"),
                                ],
                                [
                                    1,
                                    weekChange >= 0
                                        ? Highcharts.color("#4ade80").setOpacity(0).get("rgba")
                                        : Highcharts.color("#ff5d39").setOpacity(0).get("rgba"),
                                ],
                            ],
                        },
                        lineWidth: 2,
                        color: weekChange >= 0 ? "#4ade80" : "#ff5d39",
                        marker: {
                            radius: 0,
                        },
                    },
                },
                series: [
                    {
                        data: data?.map((item: any) => [
                            new Date(item.date).getTime(),
                            item.value,
                        ]),
                        pointStart: new Date(data[0].date).getTime(),
                        pointInterval: 24 * 3600 * 1000, // one day
                    },
                ],
                credits: {
                    enabled: false,
                },
                tooltip: {
                    formatter: function (): string {
                        return `<b>${Highcharts.dateFormat(
                            "%b %d, %Y",
                            // @ts-ignore
                            this.x
                            //@ts-ignore
                        )}</b><br/>Users: ${this.y}`;
                    },
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeSeiresData]);

    return { config, weekChange, latestValue };
};

export default useChartConfig;
