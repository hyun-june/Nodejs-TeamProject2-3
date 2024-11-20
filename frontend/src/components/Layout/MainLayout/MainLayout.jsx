import { Outlet } from "react-router-dom";
import { NavBar } from "../../shared/NavBar/NavBar";
import {
  BsPersonFill,
  BsPerson,
  BsPostcardFill,
  BsPostcard,
} from "react-icons/bs";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import "./MainLayout.css";

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

export const MainLayout = () => {
  return (
    <>
      <div className="layout">
        <Outlet />
      </div>
      <NavBar items={items} />
    </>
  );
};
