import { Outlet } from "react-router-dom";
import "./AuthLayout.css";

export const AuthLayout = () => {
  return (
    <div id="authLayout">
      <div id="authLayout-Container">
        <main id="authLayout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
