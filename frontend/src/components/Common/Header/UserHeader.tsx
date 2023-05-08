import styles from "./UserHeader.module.scss";
import logo from "../../../assets/Flowery_logo.png";
import { useNavigate } from "react-router";

export default function UserHeader() {
  const navigate = useNavigate();

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img
            onClick={() => navigate("/")}
            className={styles["logo-img"]}
            src={logo}
            alt="logo"
          />
        </div>
      </header>
    </div>
  );
}
