import styles from "./innercontainer.module.css";
//children prop
export default function ({ children }) {
  return <div className={styles.innerContainer}>{children}</div>;
}
