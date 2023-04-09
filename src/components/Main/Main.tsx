import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../shared/api/callApi";
import { USER_MAIN_DATA } from "../../shared/api/mockData";
import { UserInfoType } from "../../shared/type/type";
import Activity from "../Activity/Activity";
import Card from "../Card/Card";
import Chart from "../Chart/Chart";
import NoPage from "../NoPage/NoPage";

import styles from "./Main.module.css";

export default function Main() {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    getUserInfo(userId)
      .then((response) => {
        setUserInfo(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        const matchedUser = USER_MAIN_DATA.find((user) => user.id === userId);
        matchedUser && setUserInfo(matchedUser);
      });
  }, [userId]);

  return userInfo ? (
    <div className={styles.Main}>
      <h1>
        Bonjour{" "}
        <span className={styles.FirstName}>
          {userInfo?.userInfos.firstName}
        </span>
      </h1>
      <p className={styles.Message}>
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
      <div className={styles.ChartAndCard}>
        <div className={styles.Chart}>
          <Activity userId={userId} />
          <div className={styles.ChartItem}>
            <div className={styles.LineChart}>
              <Chart userId={userId} type="line" />
            </div>
            <div className={styles.RadarChart}>
              <Chart userId={userId} type="radar" />
            </div>
            <div className={styles.RadialChart}>
              <Chart
                userId={userId}
                score={userInfo.score ?? userInfo.todayScore}
                type="radial"
              />
            </div>
          </div>
        </div>
        <div className={styles.CardGrid}>
          <Card type="calorie" value={userInfo.keyData.calorieCount} />
          <Card type="protein" value={userInfo.keyData.proteinCount} />
          <Card
            type="carbohydrate"
            value={userInfo.keyData.carbohydrateCount}
          />
          <Card type="lipid" value={userInfo.keyData.lipidCount} />
        </div>
      </div>
    </div>
  ) : (
    <NoPage />
  );
}
