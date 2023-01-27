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
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../../shared/api/mockData";
import { formatPerformance, indexToDateOfWeek } from "../../shared/functions";
import {
  AverageSessionType,
  ChartProps,
  FormattedPerformanceDataType,
} from "../../shared/type/type";

export default function Chart(props: ChartProps) {
  const { type, userId, score } = props;

  const [averageSessions, setAverageSessions] = useState<
    AverageSessionType[] | undefined
  >();
  const [performance, setPerformance] = useState<
    FormattedPerformanceDataType[] | undefined
  >();

  useEffect(() => {
    if (type === "line") {
      getUserAverageSessions(userId)
        .then((response) => {
          setAverageSessions(
            response.data.data.sessions.map((session: AverageSessionType) => ({
              day: indexToDateOfWeek(session.day),
              sessionLength: session.sessionLength,
            }))
          );
        })
        .catch((error) => {
          console.error(error);
          const matchedUserSessions = USER_AVERAGE_SESSIONS.find(
            (user) => user.userId === userId
          );
          matchedUserSessions &&
            setAverageSessions(matchedUserSessions.sessions);
        });
    } else if (type === "radar") {
      getUserPerformance(userId)
        .then((response) => {
          setPerformance(formatPerformance(response.data.data));
        })
        .catch((error) => {
          console.error(error);
          const matchedUserPerformance = USER_PERFORMANCE.find(
            (user) => user.userId === userId
          );
          if (!matchedUserPerformance) return;
          setPerformance(formatPerformance(matchedUserPerformance));
        });
    }
  }, [type, userId]);

  //   const CustomizedActiveDot = (props: CustomizedActiveDotProps) => {
  //     const { cx, cy, payload } = props;
  //     return (
  //       <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red">
  //         <circle
  //           cx={10}
  //           cy={10}
  //           r={5}
  //           stroke="white"
  //           strokeWidth={3}
  //           fill="blue"
  //         />
  //         <text
  //           x={10}
  //           y={10}
  //           textAnchor="middle"
  //           dominantBaseline="middle"
  //           fill="white"
  //         >
  //           {payload.value}
  //         </text>
  //       </svg>
  //     );
  //   };

  //   const CustomizedActiveDot: React.FunctionComponent<any> = (props: any) => {
  //     const { cx, cy, value } = props;

  //     return (
  //       <svg
  //         x={cx}
  //         y={cy}
  //         width={20}
  //         height={20}
  //         fill="green"
  //         viewBox="0 0 1024 1024"
  //       >
  //         <circle
  //           cx={cx}
  //           cy={cy}
  //           r={100}
  //           stroke="gray"
  //           stroke-width="2"
  //           fill="green"
  //           fill-opacity="90%"
  //         />
  //         <circle
  //           cx={cx}
  //           cy={cy}
  //           r={100}
  //           stroke="black"
  //           stroke-width="2"
  //           fill="red"
  //           fill-opacity="70%"
  //         />
  //       </svg>
  //     );
  //   };

  const getChart = () => {
    switch (type) {
      case "line":
        return averageSessions ? (
          <LineChart data={averageSessions}>
            <Line
              type="monotone"
              dataKey="sessionLength"
              stroke="white"
              dot={false}
              //   activeDot={<CustomizedActiveDot />}
              activeDot={{ r: 3 }}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              fontFamily="Roboto"
            />
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
