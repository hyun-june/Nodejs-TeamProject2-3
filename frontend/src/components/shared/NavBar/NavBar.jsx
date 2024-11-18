import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ items, ...props }) => {
  const { pathname } = useLocation();

  return (
    <>
      <nav className="navbar" {...props}>
        {items.map(({ icon, activeIcon, path, text }) => (
          <Link
            key={path}
            to={path}
            className={`nav-item ${
              path === "/"
                ? pathname === path
                  ? "active"
                  : ""
                : pathname.includes(path)
                ? "active"
                : ""
            }`}
          >
            {path === "/"
              ? pathname === path
                ? activeIcon
                : icon
              : pathname.includes(path)
              ? activeIcon
              : icon}
            <span>{text}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};
