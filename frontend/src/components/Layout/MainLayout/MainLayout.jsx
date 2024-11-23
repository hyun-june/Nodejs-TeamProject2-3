import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "../../shared/NavBar/NavBar";
import {
  BsPersonFill,
  BsPerson,
  BsPostcardFill,
  BsPostcard,
} from "react-icons/bs";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings, MdAdminPanelSettings  } from "react-icons/md";
import { useGetMyInfo } from "../../../core/query/user";
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
    path: "/user/me",
    icon: <BsPerson />,
    activeIcon: <BsPersonFill />,
    text: "내정보",
  },
];

const adminNavItem = {
  path: "/admin/food",
  icon: <MdOutlineAdminPanelSettings />,
  activeIcon: <MdAdminPanelSettings />,
  text: "어드민",
}

export const MainLayout = () => {
  const { data, isPending } = useGetMyInfo()
  const navi = useNavigate()
  const isAdmin = !!(data?.user.level === 'admin')
  const navItems = isAdmin ? [...items, adminNavItem] : items

  if (!isPending && !data) return navi('/login')

  return (
    <>
      <div className="layout">
        <Outlet />
      </div>
      <NavBar items={navItems} />
    </>
  );
};
