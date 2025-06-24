import styles from "./nav.module.css";
import { Link } from 'react-router-dom';

export default function Nav() {
  //windowskey + . (emoji)/windows key+ "+"(magnifier)
  return <div className={styles.nav}>
   <Link to="/favorites">❤️ Favorites</Link>
    <h1>🍕FoodApp</h1></div>;
}
