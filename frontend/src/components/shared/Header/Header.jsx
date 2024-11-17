import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = ({ backTo, title, children}) => {

    return (
        <header className="header">
            { backTo && <Link to={backTo}><IoMdArrowBack size={30}/></Link>  }
            { title && <h1>{title}</h1>}
            { children }
        </header>
    )
}