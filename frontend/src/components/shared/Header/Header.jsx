import { IoMdArrowBack } from "react-icons/io";
import "./Header.css";
import { Link } from "react-router-dom";

export const Header = ({ backTo, title, children}) => {

    return (
        <header className="admin-header">
            { backTo && <Link to={backTo}><IoMdArrowBack size={30}/></Link>  }
            { title && <h1>{title}</h1>}
            { children }
        </header>
    )
}