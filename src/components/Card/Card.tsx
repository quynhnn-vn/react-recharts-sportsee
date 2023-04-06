import React from "react";
import PropTypes from "prop-types";
import { CardProps } from "../../shared/type/type";
import calorie from "../../assets/calorie.svg";
import carbohydrate from "../../assets/carbohydrate.svg";
import lipid from "../../assets/lipid.svg";
import protein from "../../assets/protein.svg";
import styles from "./Card.module.css";
import { hexToRgba } from "../../shared/functions";

function Card(props: CardProps) {
  const { type, value } = props;

  const getCardInfo = () => {
    switch (type) {
      case "calorie":
        return {
          icon: (
            <img
              src={calorie}
              alt="calorie"
              style={{
                color: "#FF0000",
              }}
            />
          ),
          unit: "kcal",
          backgroundColor: hexToRgba("#FF0000", 0.07),
          text: "Calories",
        };
      case "carbohydrate":
        return {
          icon: <img src={carbohydrate} alt="carbohydrate" />,
          unit: "g",
          backgroundColor: hexToRgba("#FDCC0C", 0.07),
          text: "Glucides",
        };
      case "lipid":
        return {
          icon: <img src={lipid} alt="lipid" />,
          unit: "g",
          backgroundColor: hexToRgba("#FD5181", 0.07),
          text: "Lipides",
        };
      default:
        return {
          icon: <img src={protein} alt="protein" />,
          unit: "g",
          backgroundColor: hexToRgba("#4AB8FF", 0.07),
          text: "Proteines",
        };
    }
  };

  return (
    <div className={styles.Card}>
      <div
        className={styles.Icon}
        style={{
          backgroundColor: getCardInfo().backgroundColor,
        }}
      >
        {getCardInfo().icon}
      </div>
      <div className={styles.CardValue}>
        <p className={styles.Value}>
          {value}
          {getCardInfo().unit}
        </p>
        <p className={styles.Text}>{getCardInfo().text}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Card;
