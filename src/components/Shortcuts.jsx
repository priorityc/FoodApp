import { Link } from "react-router-dom";
import styles from "../components/shortcuts.module.css";


export default function Shortcuts() {
  return (
    <section className={styles.section}>
      <Link to="/favorites" className={styles.shortcutsLink}>❤️ Favorites</Link>
      <Link to="/search" className={styles.shortcutsLink}>🔍 Browse Recipes</Link>
      <Link to="/planner" className={styles.shortcutsLink}>🆕 Meal Planner</Link>
    </section>
  );
}