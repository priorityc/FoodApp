//structural component
//Passing the container component as children
//This container is structural component it is not a functional
import styles from "./container.module.css";

//To acess child component in parent component use the children prop
export default function Container({ children }) {
  //Render the children here
  return <div className={styles.parentComponent}>{children}</div>;
}
