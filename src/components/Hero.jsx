import { useNavigate } from "react-router-dom";
import styles from "../components/hero.module.css";


export default function Hero() {

  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <h1>🍽️ Welcome to FoodApp</h1>
      <p>Browse. Favourite. Eat. Repeat.</p>
      <button onClick={() => navigate("/search")} className={styles.heroButton}>🍴 Get Inspired</button>
    </section>
  );
}