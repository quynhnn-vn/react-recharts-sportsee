import React from "react";
import meditation from "../../assets/meditation.svg";
import swimming from "../../assets/swimming.svg";
import cycling from "../../assets/cycling.svg";
import weightlifting from "../../assets/weightlifting.svg";
import SportNav from "../SportNav/SportNav";
import styles from "./VerticalNavigation.module.css";

/**
 * Component for the vertical navigation
 * @component
 */
export default function VerticalNavigation() {
  const sports = [
    { id: 1, icon: <img src={meditation} alt="meditation" /> },
    {
      id: 2,
      icon: <img src={swimming} alt="swimming" />,
    },
    {
      id: 3,
      icon: <img src={cycling} alt="cycling" />,
    },
    {
      id: 4,
      icon: <img src={weightlifting} alt="weightlifting" />,
    },
  ];

  return (
    <div className={styles.VerticalNavigation}>
      {sports.map((sport) => (
        <SportNav key={sport.id} sport={sport} />
      ))}
      <span className={styles.Copyright}>Copyright, SportSee 2020</span>
    </div>
  );
}
