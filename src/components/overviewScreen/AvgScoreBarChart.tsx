import {
  BarChart,
  axisClasses,
  chartsGridClasses,
  HighlightScope,
} from "@mui/x-charts";

import Legend from "./Legend";

import { useQDigitalCreditRatingStats } from "@hooks/api/queries/analytics.queries";
import { scoreRecommendations } from "@utils/constants";

// const uData = [40000, 30000, 20000, 278, 18900, 23900, 34900];
// const pData = [24000, 13980, 98000, 39080, 48000, 38000, 43000];
// const xLabels = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const barData = [
//   {
//     data: pData,
//     label: "Very Poor",
//     id: "vPoor",
//     stack: "total",
//     color: "#E70033",
//   },
//   {
//     data: uData,
//     label: "Poor",
//     id: "poor",
//     stack: "total",
//     color: "#FF7643",
//   },
//   {
//     data: pData,
//     label: "Fair",
//     id: "fair",
//     stack: "total",
//     color: "#F6F002",
//   },
//   {
//     data: uData,
//     label: "Good",
//     id: "good",
//     stack: "total",
//     color: "#7ED957",
//   },
//   {
//     data: pData,
//     label: "Excellent",
//     id: "excellent",
//     stack: "total",
//     color: "#2B8F3C",
//   },
// ];

// Eg of timekey:  January, week 1, Saturday
const AvgScoreBarChart = ({
  startDate,
  endDate,
}: {
  startDate: moment.Moment;
  endDate: moment.Moment;
}) => {
  const { result } = useQDigitalCreditRatingStats({ startDate, endDate });
  if (!result) return <></>;
  const xLabels = result ? Object.keys(result?.creditRatingCounts) : [];

  const veryPoorData = xLabels.map(
    (timeKey) =>
      result.creditRatingCounts[
        timeKey as keyof typeof result.creditRatingCounts
      ].very_poor,
  );
  const poorData = xLabels.map(
    (timeKey) =>
      result.creditRatingCounts[
        timeKey as keyof typeof result.creditRatingCounts
      ].poor,
  );
  const fairData = xLabels.map(
    (timeKey) =>
      result.creditRatingCounts[
        timeKey as keyof typeof result.creditRatingCounts
      ].fair,
  );
  const goodData = xLabels.map(
    (timeKey) =>
      result.creditRatingCounts[
        timeKey as keyof typeof result.creditRatingCounts
      ].good,
  );
  const excellentData = xLabels.map(
    (timeKey) =>
      result.creditRatingCounts[
        timeKey as keyof typeof result.creditRatingCounts
      ].excellent,
  );

  // Define the labels for the x-axis
  // const xLabels = timeKeys;

  // Create the barData array based on the ratings
  const barData = [
    {
      data: veryPoorData,
      stack: "total",
      highlightScope: {
        highlighted: "none", //  none | item   | series
        faded: "none", //  none | series | global
      } as HighlightScope,
      ...scoreRecommendations[0],
    },
    {
      data: poorData,
      stack: "total",
      highlightScope: {
        highlighted: "none",
        faded: "none",
      } as HighlightScope,
      ...scoreRecommendations[1],
    },
    {
      data: fairData,
      stack: "total",
      highlightScope: {
        highlighted: "none",
        faded: "none",
      } as HighlightScope,
      ...scoreRecommendations[2],
    },
    {
      data: goodData,
      stack: "total",
      highlightScope: {
        highlighted: "none",
        faded: "none",
      } as HighlightScope,
      ...scoreRecommendations[3],
    },
    {
      data: excellentData,
      stack: "total",
      highlightScope: {
        highlighted: "none",
        faded: "none",
      } as HighlightScope,
      ...scoreRecommendations[4],
    },
  ];

  return (
    <div>
      <BarChart
        className="w-full"
        width={700}
        height={400}
        margin={{ left: 50 }}
        grid={{ horizontal: true }}
        slotProps={{ legend: { hidden: true } }}
        series={barData}
        yAxis={[
          {
            // label: "Number of Applications",
            labelStyle: {
              fill: "#404F65",
              fontSize: 10,
              fontWeight: 500,
              fontFamily: "Poppins",
            },
            tickMinStep: 1,
            disableLine: true,
            disableTicks: true,
            valueFormatter: (value) =>
              value > 1000
                ? `${(value / 1000).toLocaleString("en-NG", { maximumFractionDigits: 1 })}K`
                : value,
          },
        ]}
        xAxis={[
          {
            data: xLabels.map((timeKey) =>
              timeKey.includes("Week") ? timeKey : timeKey.slice(0, 3),
            ),
            scaleType: "band",
            disableLine: true,
            disableTicks: true,
          },
        ]}
        sx={{
          [`& .${chartsGridClasses.line}`]: {
            // strokeDasharray: "5 3",
            strokeWidth: 0.5,
            stroke: "#718096",
            strokeOpacity: "0.15",
          },
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: "translateX(-14px)",
          },
        }}
      />

      <Legend data={barData} />
    </div>
  );
};

export default AvgScoreBarChart;
