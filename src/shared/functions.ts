import {
  FormattedPerformanceDataType,
  FormattedSessionType,
  PerformanceDataType,
  PerformanceType,
  SessionType,
} from "./type/type";

export const hexToRgba = (hex: string, opacity: number) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}, ${opacity})`
    : hex;
};

export const indexToDateOfWeek = (index: number) => {
  switch (index) {
    case 1:
      return "L";
    case 2:
      return "M";
    case 3:
      return "M";
    case 4:
      return "J";
    case 5:
      return "V";
    case 6:
      return "S";
    case 7:
      return "D";
    default:
      return "L";
  }
};

export const formatPerformance = (
  performance: PerformanceType
): FormattedPerformanceDataType[] => {
  if (!performance) return [];
  const { data, kind } = performance;
  if (data.length === 0) return [];

  return data.map((entry: PerformanceDataType) => {
    return {
      kind: kind[entry.kind as keyof typeof kind],
      value: entry.value,
    };
  });
};

export const formatSessions = (
  sessions: SessionType[]
): FormattedSessionType[] => {
  if (!sessions || sessions.length === 0) return [];

  return sessions.map((session: SessionType) => {
    return {
      ...session,
      date: new Date(session.day).getDate(),
    };
  });
};
