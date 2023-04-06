import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Surface,
  Symbols,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getUserActivity } from "../../shared/api/callApi";
import { USER_ACTIVITY } from "../../shared/api/mockData";
import { formatSessions } from "../../shared/functions";
import { ActivityProps, SessionType } from "../../shared/type/type";
import styles from "./Activity.module.css";

function Activity(props: ActivityProps) {
  const { userId } = props;
  const [activities, setActivities] = useState<SessionType[] | null>();

  useEffect(() => {
    getUserActivity(userId)
      .then((response) => {
        setActivities(formatSessions(response.data.data.sessions));
      })
      .catch((error) => {
        console.error(error);
        const matchedUserActivity = USER_ACTIVITY.find(
          (user) => user.userId === userId
        );
        if (!matchedUserActivity) return;
        setActivities(formatSessions(matchedUserActivity.sessions));
      });
  }, [userId]);

  const renderLegend = (props: any) => {
    const { payload } = props;
    let content = null;
    if (payload)
      content = (
        <div className={styles.Legend}>
          <span className={styles.LegendTitle}>Activité quotidienne</span>
          <div className={styles.LegendText}>
            {payload.map((entry: any, index: number) => (
              <div key={index}>
                <Surface
                  width={10}
                  height={10}
                  viewBox={{ x: 0, y: 0, width: 10, height: 10 }}
                >
                  <Symbols
                    cx={5}
                    cy={5}
                    type="circle"
                    size={50}
                    fill={entry.color}
                  />
                </Surface>
                <span className={styles.LegendValue}>
                  {entry.value === "kilogram"
                    ? "Poids (kg)"
                    : "Calories brûlées (kCal)"}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    return content;
  };

  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    let content = null;
    if (active && payload && payload.length) {
      content = (
        <div className={styles.Tooltip}>
          {payload.map((entry: any, index: number) => (
            <div key={index} className={styles.TooltipTitle}>
              {entry.dataKey === "kilogram"
                ? entry.value + "kg"
                : entry.value + "Kcal"}
            </div>
          ))}
        </div>
      );
    }
    return content;
  };

  return activities !== null ? (
    <div className={styles.BarChart}>
      <ResponsiveContainer width="100%" height="100%" debounce={0.9}>
        <BarChart
          data={activities}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="2 2" />
          <XAxis
            dataKey="date"
            tickLine={false}
            tick={{
              fontFamily: "Roboto",
              fontWeight: 500,
              fontSize: "14px",
              color: "#9B9EAC",
            }}
            tickMargin={16}
            axisLine={{
              stroke: "#DEDEDE",
            }}
          />
          <YAxis
            orientation="right"
            tickLine={false}
            axisLine={false}
            type="number"
            domain={[(dataMin: number) => Math.max(0, dataMin - 10), "dataMax"]}
          />
          <Tooltip content={renderTooltip} />
          <Legend verticalAlign="top" content={renderLegend} />
          <Bar
            dataKey="kilogram"
            fill="var(--black)"
            radius={[3, 3, 0, 0]}
            // maxBarSize={30}
          />
          <Bar
            dataKey="calories"
            fill="var(--red)"
            radius={[3, 3, 0, 0]}
            // maxBarSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : null;
}

Activity.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Activity;
