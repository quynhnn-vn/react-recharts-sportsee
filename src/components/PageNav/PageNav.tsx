import React from "react";
import PropTypes from "prop-types";
import { PageNavProps } from "../../shared/type/type";
import styles from "./PageNav.module.css";

/**
 * Component for the navigation of page
 * @component
 */
function PageNav(props: PageNavProps) {
  const { page } = props;
  return <div className={styles.PageNav}>{page.text}</div>;
}

PageNav.propTypes = {
  /**
   * page object
   */
  page: PropTypes.object.isRequired,
};

export default PageNav;
