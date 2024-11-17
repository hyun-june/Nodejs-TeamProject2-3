import { Outlet } from "react-router-dom";
import { AuthHeader } from "./AuthHeader/AuthHeader";
import "./AuthLayout.css";

export const AuthLayout = () => {
  return (
    <div id="authLayout">
      <div id="authLayout-Container">
        <AuthHeader />
        <main id="authLayout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
