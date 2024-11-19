import { Outlet } from "react-router-dom"
import { Header } from "../../shared/Header/Header";
import { NavBar } from "../../shared/NavBar/NavBar";
import { FaBowlFood } from "react-icons/fa6"; 
import { MdSportsVolleyball, MdDynamicFeed } from "react-icons/md";
import "./AdminLayout.css";

const items = [
    {
        path: "/admin/food",
        icon: <FaBowlFood />,
        activeIcon: <FaBowlFood />,
        text: "food",
    },
    {
        path: "/admin/exercise",
        icon: <MdSportsVolleyball />,
        activeIcon: <MdSportsVolleyball />,
        text: "exercise",
    },
    {
        path: "/admin/feed",
        icon: <MdDynamicFeed />,
        activeIcon: <MdDynamicFeed />,
        text: "feed",
    },
];

export const AdminLayout = () => {

    return <>
        <div className="admin-layout-main layout">
            <Header backTo='/' title='Admin' />
            <main>
                <Outlet/>
            </main>
        </div>
        <NavBar items={items}/>
    </>
}