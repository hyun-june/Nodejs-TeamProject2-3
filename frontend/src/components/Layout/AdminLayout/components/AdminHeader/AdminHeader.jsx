import { IoMdArrowBack } from "react-icons/io";
import "./AdminHeader.css";

export const AdminHeader = () => {
    return (
        <header className="admin-header">
            <IoMdArrowBack size={30}/>
            <h1>Admin</h1>
        </header>
    );
}