import styles from "./UserHeader.module.scss";
import logo from "../../../assets/Flowery_logo.png";
import hamburger from "../../../assets/HamburgerGreen.png";
import profile from "../../../assets/profileGreen.png";

export default function UserHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between  items-center bg-user_beige">
      <p className=" text-user_green font-ballet bg-transparent p-2 m-1">
        Flowery
      </p>
      <div className="flex">
        <img src={profile} alt="profile" className="w-[1rem] mr-3" />
        <img src={hamburger} alt="hamburger" className="w-[1rem] mr-3" />
      </div>
    </header>
  );
}
