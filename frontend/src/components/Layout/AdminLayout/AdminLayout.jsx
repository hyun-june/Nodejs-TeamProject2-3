import { Outlet } from "react-router-dom"
import { AdminNavbar } from "./components/AdminNavbar/AdminNavbar";
import { Header } from "../../shared/Header/Header";
import "./AdminLayout.css";

export const AdminLayout = () => {

    return <div id="temporary-inner-body">
        <div id="bottom-sheet"/>
        <div className="admin-layout-main">
            <Header backTo='/' title='Admin' />
            <main>
                <Outlet/>
            </main>
        </div>
        <AdminNavbar/>
    </div>
}