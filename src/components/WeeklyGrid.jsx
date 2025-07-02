import React from 'react';
import MealCard from "./MealCard";

// state passed from WeeklyPlanner component
export default function WeeklyGrid({ mealPlan }) {
  

  if (!mealPlan) {
    return <p>🛑 No meal plan data available.</p>;
  }

  // Define labels for each meal by index
  const mealLabels = ["🥣 Breakfast", "🍱 Lunch", "🍝 Dinner"];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", padding: "1rem" }}>
      {Object.entries(mealPlan).map(([day, dayData]) => (
        <div
          key={day}
          style={{
            flex: "1 1 250px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h2 style={{ textTransform: "capitalize", marginBottom: "1rem" }}>{day}</h2>

          {dayData.meals.map((meal, index) => (
            <div key={meal.id}>
              <h3>{mealLabels[index]}</h3>
              {/* The component that renders single meal  card*/}
              <MealCard meal={meal} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}