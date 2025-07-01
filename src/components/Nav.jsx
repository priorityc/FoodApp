
  //windowskey + . (emoji)/windows key+ "+"(magnifier)


import styles from "./nav.module.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
     <header className={styles.header}>

      <div className={styles.nav}>
        <h1 className={styles.logo}>🍕FoodApp</h1>
        {/* Navigation */}
        <nav>
          <Link to="/favorites" className={styles.navLink}>❤️ Favorites</Link>
        </nav>

      </div>
    </header>
  );
}
