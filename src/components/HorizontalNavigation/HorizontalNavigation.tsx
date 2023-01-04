import React from "react";
import logo from "../../assets/logo.png";
import PageNav from "../PageNav/PageNav";
import styles from "./HorizontalNavigation.module.css";

export default function HorizontalNavigation() {
  const pages = [
    {
      id: 1,
      text: (
        <a href="/">
          <img src={logo} alt="logo" className={styles.Logo} />
          <span className={styles.Title}>SportSee</span>
        </a>
      ),
    },
    {
      id: 2,
      text: <a href="/">Accueil</a>,
    },
    {
      id: 3,
      text: <a href="/">Réglage</a>,
    },
    {
      id: 4,
      text: <a href="/">Profil</a>,
    },
    {
      id: 5,
      text: <a href="/">Communauté</a>,
    },
  ];

  return (
    <div className={styles.HorizontalNavigation}>
      {pages.map((page) => (
        <PageNav key={page.id} page={page} />
      ))}
    </div>
  );
}
