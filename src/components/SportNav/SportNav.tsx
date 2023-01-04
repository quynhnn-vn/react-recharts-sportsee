import React from "react";
import { SportNavProps } from "../../shared/type/type";
import styles from "./SportNav.module.css";

export default function SportNav(props: SportNavProps) {
  const { sport } = props;
  return <div className={styles.SportNav}>{sport.icon}</div>;
}
