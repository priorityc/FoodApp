import { useEffect } from "react";
import { useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  //create a state to save the information received from the API call
  const [food, setFood] = useState({});
  //add as loading state as boolean when data is loading set to true
  const [isLoading, setIsLoading] = useState(true);
  //make request to the End point to get the receipt inform acording to id we pass
  //place our foodid received from props
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;

  //const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "2d9c01885882495eb47cc2575c918eec";

  // fetch the id
  useEffect(() => {
    async function fetchFoodDetails() {
      //URL+API key
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFoodDetails();
  }, [foodId]);

  return (
    // The outer div
    <div>
      {/* div for recepi card */}
      <div className={styles.recipeCard}>
        {foodId}
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="food image" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⏱{food.readyInMinutes}</strong>
          </span>
          <span>
            👪<strong>Serves{food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕Vegetarian" : "🍖Non-Vegetarian"}
            </strong>
          </span>
          <span>
            <strong>🐄{food.vegan ? "Vegan" : "Non-Vegan"}</strong>
          </span>
        </div>

        {/* container for displaying price per serving */}
        <div>
          💲
          <span>
            <strong>
              {Math.round(food.pricePerServing / 100)} Per serving
            </strong>
          </span>
        </div>
      </div>

      <h2>Ingredients</h2>
      <ItemList food={food} isLoading={isLoading} />
      <h2>Instructions</h2>
      <div className={styles.recipeInstructions}>
        <ol>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            food.analyzedInstruction &&
            food.analyzedInstruction[0].steps.map((step) => (
              <li key={step.name}>{step.step}</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
