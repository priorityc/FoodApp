import { useState } from "react";
import WeeklyForm from "../components/WeeklyForm";
import WeeklyGrid from "../components/WeeklyGrid";
import Footer from "../components/Footer";

// const URL = `https://api.spoonacular.com/recipes/complexSearch`;
const API_KEY = "2d9c01885882495eb47cc2575c918eec";

export default function WeeklyPlaner() {
//This state will be passed as a prop inside the WeeklyGrid to display the meal plan requiested 
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //State to track the loading of the downloadshoping list button 
  const [loadingShoppingList, setLoadingShoppingList] = useState(false);


  //- That function fetches the custom weekly meal plan from Spoonacular and stores it in mealPlan.

  const handleGenerate = async ({ calories, diet }) => {
    setLoading(true);
    setError("");
    try {
      const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=${calories}&diet=${diet}&apiKey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
console.log(data);
      if (data && data.week) {
        setMealPlan(data.week);
      } else {
        setError("Could not generate a meal plan.");
      }
      } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // - Loop through all meals
  //- Fetch ingredients
//- Format and deduplicate
//- Call downloadShoppingList()

const generateShoppingList = async (mealPlan) => {
  if (!mealPlan || typeof mealPlan !== "object") return;

  setLoadingShoppingList(true);

  try {
    const allMeals = Object.values(mealPlan).flatMap(day => day.meals);
    const recipeIds = allMeals.map(meal => meal.id);

    const ingredientFetches = recipeIds.map(id =>
      fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`)
        .then(res => res.json())
    );

    const ingredientData = await Promise.all(ingredientFetches);
    const allIngredients = ingredientData.flatMap(recipe => recipe.extendedIngredients);

    const deduplicated = {};
    allIngredients.forEach(item => {
  const name = item.nameClean || item.name;
  if (deduplicated[name]) {//- If the ingredient has already been seen before:

    deduplicated[name] += item.amount;//- Add the new amount to the existing total.

  } else {
    deduplicated[name] = item.amount;
  }
});

////convert it into a clean text file and trigger a download
////- map() builds a string like:
//– 3.00 × onion
//– 1.50 × olive oil

    const shoppingList = Object.entries(deduplicated).map(//- Object.entries(deduplicated) converts it into an array of key-value pairs
      ([name, amount]) => `– ${amount.toFixed(2)} × ${name}`
    );

    const content = shoppingList.join("\n");//- Joins all lines into one string, separated by line breaks
    const blob = new Blob([content], { type: "text/plain" });//- Result: a plain-text ingredient list like expect in a .txt file
    const url = URL.createObjectURL(blob);//Creates a URL pointing to that Blob so it can be downloaded

    const link = document.createElement("a");//a element created
    link.href = url;
    link.download = "weekly-shopping-list.txt";//- Sets download so the file will be named "weekly-shopping-list.txt
    document.body.appendChild(link);//apend the link element
    link.click();//automaticaly click
    document.body.removeChild(link);//then remove the element
  } catch (error) { //catch the error
    console.error("Failed to generate shopping list:", error);
  } finally {
    setLoadingShoppingList(false);
  }
};




return (
    <main style={{ padding: "2rem 1rem", textAlign: "center" }}>
      <h1>📅 Weekly Meal Planner</h1>
      <p>Select your calorie target and generate a custom meal plan for the week.</p>
      <WeeklyForm onGenerate={handleGenerate}/>
      {loading && <p>Loading plan...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {mealPlan && <WeeklyGrid mealPlan={mealPlan} />}
    {/* Button for generating the shoping list for the meal planner */}
     <button
  disabled={loadingShoppingList}
  onClick={() => generateShoppingList(mealPlan)}
>
  🛒 {loadingShoppingList ? "Generating..." : "Download Shopping List"}
</button>


      <Footer />
    </main>
  );
}