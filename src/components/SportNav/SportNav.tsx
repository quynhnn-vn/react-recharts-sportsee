import React from "react";
import PropTypes from "prop-types";
import { SportNavProps } from "../../shared/type/type";
import styles from "./SportNav.module.css";

function SportNav(props: SportNavProps) {
  const { sport } = props;
  return <div className={styles.SportNav}>{sport.icon}</div>;
}

SportNav.propTypes = {
  sport: PropTypes.object.isRequired,
};

export default SportNav;
