import styles from "./UserHeader.module.scss";
import logo from "../../../assets/Flowery_logo.png";

export default function UserHeader() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img className={styles["logo-img"]} src={logo} alt="logo" />
        </div>
      </header>
    </div>
  );
}
