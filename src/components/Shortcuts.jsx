import { Link } from "react-router-dom";
import styles from "../components/shortcuts.module.css";


export default function Shortcuts() {
  return (
    <section className={styles.section}>
      <Link to="/favorites" className={styles.shortcutsLink}>❤️ Favorites</Link>
      <Link to="/browse" className={styles.shortcutsLink}>🔍 Browse Recipes</Link>
      <Link to="/new" className={styles.shortcutsLink}>🆕 New</Link>
    </section>
  );
}