import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import {
  getUserAverageSessions,
  getUserPerformance,
} from "../../shared/api/callApi";
import {
  AverageSessionType,
  ChartProps,
  PerformanceDataType,
  PerformanceType,
} from "../../shared/type/type";

export default function Chart(props: ChartProps) {
  const { type, userId, score } = props;

  const [averageSessions, setAverageSessions] = useState<
    AverageSessionType[] | undefined
  >();
  const [performance, setPerformance] = useState<
    PerformanceType[] | undefined
  >();

  useEffect(() => {
    if (type === "line") {
      getUserAverageSessions(userId)
        .then((response) => {
          setAverageSessions(response.data.data.sessions);
        })
        .catch((error) => console.error(error));
    } else if (type === "radar") {
      getUserPerformance(userId)
        .then((response) => {
          const { data, kind } = response.data.data;
          setPerformance(
            data.map((entry: PerformanceDataType) => {
              return {
                kind: kind[entry.kind],
                value: entry.value,
              };
            })
          );
        })
        .catch((error) => console.error(error));
    }
  }, [type, userId]);

  const getChart = () => {
    switch (type) {
      case "line":
        return averageSessions ? (
          <LineChart data={averageSessions}>
            <Line
              type="monotone"
              dataKey="sessionLength"
              stroke="white"
              activeDot={{ r: 5 }}
            />
            <XAxis dataKey="day" />
            <Tooltip />
          </LineChart>
        ) : (
          <></>
        );
      case "radar":
        return performance ? (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performance}>
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis dataKey="kind" />
            <Radar
              dataKey="value"
              stroke="var(--red)"
              fill="var(--red)"
              fillOpacity={0.7}
            />
          </RadarChart>
        ) : (
          <></>
        );
      case "radial":
        return (
          <PieChart>
            <Pie
              data={[
                { name: "score", value: score, fill: "var(--red)" },
                {
                  name: "total",
                  value: 1,
                  fill: "white",
                },
              ]}
              cx={120}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            />
          </PieChart>
        );
      default:
        return <></>;
    }
  };
  return (
    <ResponsiveContainer width="100%" height="100%" debounce={0.9}>
      {getChart()}
    </ResponsiveContainer>
  );
}
