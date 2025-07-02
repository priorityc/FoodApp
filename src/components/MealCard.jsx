//single meal representation:
import React from "react";

export default function MealCard({ meal }) {
  if (!meal) return null;

  return (
    <div
      style={{
        marginBottom: "1rem",
        background: "#fffaf4",
        padding: "0.5rem",
        borderRadius: "6px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
      }}
    >
      <img
        src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
        alt={`Image of ${meal.title}`}
        style={{ width: "100%", borderRadius: "4px" }}
      />
      <h4 style={{ marginTop: "0.5rem" }}>{meal.title}</h4>
      <p>⏱ {meal.readyInMinutes} min</p>
      <a
        href={meal.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#ff4b2b" }}
      >
        View Recipe
      </a>
    </div>
  );
}