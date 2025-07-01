import { useEffect, useState } from "react";
import styles from "../components/featured.module.css";

  const API_KEY = "2d9c01885882495eb47cc2575c918eec";

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch(`https://api.spoonacular.com/recipes/random?number=4&apiKey=${API_KEY}`);
        const data = await res.json();

        if (data && Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
        } else {
          setError("Failed to load recipes.");
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.section}>
      {recipes.map((recipe) => (
        <div key={recipe.id} className={styles.recipeCard} >
          <img src={recipe.image} alt={recipe.title} style={{ width: "100%" }} />
          <h3 style={{ padding: "0.5rem" }}>{recipe.title}</h3>
        </div>
      ))}
    </section>
  );
}