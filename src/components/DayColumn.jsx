//The DayColumn component is a modular layout block designed to show one full day of the weekly meal plan—typically breakfast, lunch, and dinner, plus optional nutritional info.

import React from "react";
import MealCard from "./MealCard"; // Make this reusable for displaying a single meal

//- day: string like "monday"
//- meals: array of 3 recipes for that day
//- nutrients: object with total calories for the day

export default function DayColumn({ day, meals, nutrients }) {
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  return (
    <div className="day-column">
        {/* It shows the capitalized day name (e.g. “Monday”) and daily summary: */}
      <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
      <p>🔥 Calories: {Math.round(nutrients.calories)} kcal</p>


    {/* It loops over the 3 meals and labels them by index: */}
      {meals.map((meal, index) => (
  <div key={meal.id}>
    {/* <h3>{mealTypes[index]}</h3> */}
    <MealCard meal={meal} />
  </div>
))}

    </div>
  );
}