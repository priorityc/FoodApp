import React from "react";
import styles from "./item.module.css";

export default function Item({ item }) {
  return (
    <div>
      {/* display flex this container */}
      <div className={styles.itemContainer}>
        {/* image container */}
        <div className={styles.imageContainer}>
          {" "}
          <img
            className={styles.image}
            src={
              `https://spoonacular.com/cdn/ingredients_100x100/` + item.image
            }
            alt=""
          />
        </div>

        {/* Name container */}
        <div className={styles.nameContainer}>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.amount}>
            {item.amount}
            {item.unit}
          </div>
        </div>
      </div>
    </div>
  );
}
