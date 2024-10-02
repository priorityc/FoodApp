import React from "react";
import Item from "./Item";
export default function ItemList({ food, isLoading }) {
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        food.extendedIngredients &&
        food.extendedIngredients.map((item) => <Item item={item} />)
      )}
    </div>
  );
}
