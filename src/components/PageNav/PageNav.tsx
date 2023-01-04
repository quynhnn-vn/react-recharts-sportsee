import React from "react";
import { PageNavProps } from "../../shared/type/type";
import styles from "./PageNav.module.css";

export default function PageNav(props: PageNavProps) {
  const { page } = props;
  return <div className={styles.PageNav}>{page.text}</div>;
}
