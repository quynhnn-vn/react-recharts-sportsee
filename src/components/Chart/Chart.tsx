import { useEffect, useRef, useState } from "react";
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
  YAxis,
  Label,
} from "recharts";
import {
  getUserAverageSessions,
  getUserPerformance,
} from "../../shared/api/callApi";
import {
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../../shared/api/mockData";
import {
  formatAverageSessions,
  formatPerformance,
} from "../../shared/functions";
import {
  ChartProps,
  FormattedAverageSessionType,
  FormattedPerformanceDataType,
} from "../../shared/type/type";
import styles from "./Chart.module.css";

export default function Chart(props: ChartProps) {
  const { type, userId, score } = props;

  const [averageSessions, setAverageSessions] = useState<
    FormattedAverageSessionType[] | undefined
  >();
  const [performance, setPerformance] = useState<
    FormattedPerformanceDataType[] | undefined
  >();
  const ref = useRef<HTMLInputElement>();
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (ref.current) {
      setSize({
        height: ref.current.clientHeight,
        width: ref.current.clientWidth,
      });
    }
  }, [ref]);

  useEffect(() => {
    if (type === "line") {
      getUserAverageSessions(userId)
        .then((response) => {
          setAverageSessions(
            formatAverageSessions(response.data.data.sessions)
          );
        })
        .catch((error) => {
          console.error(error);
          const matchedUserSessions = USER_AVERAGE_SESSIONS.find(
            (user) => user.userId === userId
          );
          if (!matchedUserSessions) return;
          setAverageSessions(
            formatAverageSessions(matchedUserSessions.sessions)
          );
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

  const renderLineTooltip = (props: any) => {
    const { active, payload } = props;
    let content = null;
    if (active && payload && payload.length) {
      content = (
        <div className={styles.Tooltip}>
          {payload.map((entry: any, index: number) => (
            <div key={index} className={styles.TooltipTitle}>
              {entry.value + "min"}
            </div>
          ))}
        </div>
      );
    }
    return content;
  };

  const renderRadarTooltip = (props: any) => {
    const { active, payload } = props;
    let content = null;
    if (active && payload && payload.length) {
      content = (
        <div className={styles.Tooltip}>
          {payload.map((entry: any, index: number) => (
            <div key={index} className={styles.TooltipTitle}>
              {`${entry.payload.kind} : ${entry.value}`}
            </div>
          ))}
        </div>
      );
    }
    return content;
  };

  const getChart = () => {
    switch (type) {
      case "line":
        return averageSessions ? (
          <LineChart data={averageSessions}>
            <text
              x={"30%"}
              y={20}
              fill="#FFFFFF"
              textAnchor="middle"
              dominantBaseline="central"
              opacity={0.5}
            >
              <tspan fontSize="15" fontWeight="500" fontFamily="Roboto">
                Durée moyenne des sessions
              </tspan>
            </text>
            <Line
              type="natural"
              dataKey="sessionLength"
              stroke="white"
              dot={false}
              activeDot={{ r: 3 }}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              fontFamily="Roboto"
              fontWeight={500}
              stroke="#FFFFFF"
              opacity={0.5}
            />

            <Tooltip content={renderLineTooltip} />
          </LineChart>
        ) : (
          <></>
        );
      case "radar":
        return performance ? (
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={performance}
            margin={{ top: 5, right: 5, bottom: 30, left: 5 }}
          >
            <PolarGrid gridType="polygon" radialLines={false} />
            <PolarAngleAxis dataKey="kind" cy={500} />
            <Radar
              dataKey="value"
              stroke="var(--red)"
              fill="var(--red)"
              fillOpacity={0.7}
            />
            <Tooltip content={renderRadarTooltip} />
          </RadarChart>
        ) : (
          <></>
        );
      case "radial":
        return (
          <PieChart width={size.width} height={size.height}>
            <text
              x="10%"
              y={20}
              fill="#000000"
              textAnchor="middle"
              dominantBaseline="central"
            >
              <tspan fontSize="15" fontWeight="500" fontFamily="Roboto">
                Score
              </tspan>
            </text>
            <Pie
              data={[
                { name: "score", value: score, fill: "var(--red)" },
                {
                  name: "total",
                  value: 1,
                  fill: "white",
                },
              ]}
              cx="50%"
              cy="50%"
              cornerRadius={10}
              innerRadius={85}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              <Label
                value={`${
                  score ? Math.floor(score * 100) : 0
                }% de votre objectif`}
                position="center"
              />
            </Pie>
          </PieChart>
        );
      default:
        return <></>;
    }
  };

  return (
    <ResponsiveContainer ref={ref} width="100%" height="100%" debounce={0.9}>
      {getChart()}
    </ResponsiveContainer>
  );
}
