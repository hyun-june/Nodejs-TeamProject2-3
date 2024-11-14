import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import {
  BsPersonFill,
  BsPerson,
  BsPostcardFill,
  BsPostcard,
} from "react-icons/bs";
import { IoHome, IoHomeOutline } from "react-icons/io5";

const items = [
  {
    path: "/",
    icon: <IoHomeOutline />,
    activeIcon: <IoHome />,
    text: "홈",
  },
  {
    path: "/feed",
    icon: <BsPostcard />,
    activeIcon: <BsPostcardFill />,
    text: "피드",
  },
  {
    path: "/my",
    icon: <BsPerson />,
    activeIcon: <BsPersonFill />,
    text: "내정보",
  },
];

export const NavBar = ({ ...props }) => {
  const location = useLocation();

  return (
    <>
      <nav className="navbar" {...props}>
        {items.map(({ icon, activeIcon, path, text }) => (
          <Link
            key={path}
            to={path}
            className={`nav-item ${location.pathname === path ? "active" : ""}`}
          >
            {location.pathname === path ? activeIcon : icon}
            <span>{text}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};