export interface UserInfoType {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  score: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

export interface SessionType {
  day: string;
  kilogram: number;
  calories: number;
}

export interface ActivityProps {
  userId: number;
}

export interface ActivityType {
  id: number;
  sessions: SessionType[];
}

export interface CardProps {
  type: "calorie" | "protein" | "carbohydrate" | "lipid";
  value: number;
}

export interface ChartProps {
  type: "line" | "radar" | "radial";
  userId: number;
  score?: number;
}

export interface AverageSessionType {
  day: number;
  sessionLength: number;
}

export interface PerformanceDataType {
  value: number;
  kind: number;
}

export interface PerformanceType {
  userId: number;
  kind: {};
  data: PerformanceDataType[];
}

export interface SportNavProps {
  sport: any;
}

export interface PageNavProps {
  page: any;
}
