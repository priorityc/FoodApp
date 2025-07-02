//WeeklyForm is a reusable React form component that lets users choose their target daily calories and an optional diet preference, 
// like vegan or keto. Once submitted, it calls a handler function to trigger the Spoonacular API and fetch a weekly meal plan.

import { useState } from "react";
import styles from "../components/weeklyform.module.css";

//- onGenerate is passed to WeeklyForm, 
// so when the form is submitted, it calls the function with the selected calories and diet.

export default function WeeklyForm({ onGenerate }) {
    // stores the target calorie value (default is 2000 kcal)
  const [calories, setCalories] = useState(2000);
  // stores the selected diet type (empty string means no restriction
  const [diet, setDiet] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();//stops the page from reloading when the form is submitted.
    //-function passed in from the parent component (WeeklyPlanner)
    //—it will use these values to generate a weekly meal plan via the Spoonacular API.

    onGenerate({ calories, diet });
  };

//  Input for daly target

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1.5rem 0" }}>
      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        Target Calories:
        <input //- Numeric input for calories, allowing only numbers between 1000 and 4000.
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}//- onChange keeps the React state in sync with user typing.
          min="1000"
          max="4000"
          step="100"
          style={{ marginLeft: "0.5rem", padding: "0.4rem" }}
        />
      </label>

      <label style={{ display: "block", margin: "1rem 0 0.5rem" }}>
        Diet Type:
        <select //users optionally filter the meal plan by diet, this updates the diet state
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          style={{ marginLeft: "0.5rem", padding: "0.4rem" }}
        >
          <option value="">None</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="gluten free">Gluten-Free</option>
        </select>
      </label>

      <button
        type="submit"
        className={styles.formButton}
    
      >
        Generate Weekly Plan
      </button>
    </form>
  );
}