import { Link } from "react-router-dom";
import { FaBowlFood } from "react-icons/fa6"; 
import { MdSportsVolleyball, MdDynamicFeed } from "react-icons/md";
import { useLocation } from "react-router-dom";
import "./AdminNavbar.css";

const navMenus = [
    {
        name : 'food',
        icon : <FaBowlFood/>
    },
    {
        name : 'exercise',
        icon : <MdSportsVolleyball/>
    },
    {
        name : 'feed',
        icon : <MdDynamicFeed/>
    },
]

export const AdminNavbar = ({...props}) => {
    const { pathname } = useLocation()

    return (
        <nav className="admin-layout-navbar" {...props}>
            <ol>
                {
                    navMenus.map(({icon,name})=>                    
                    <li key={name}>
                        <Link to={`/admin/${name}`} style={{ color : pathname === `/admin/${name}` && 'var(--point-color)'}}>
                            {icon}
                            <span>{name}</span>
                        </Link>
                    </li>)
                }
            </ol>
        </nav>
    )
}