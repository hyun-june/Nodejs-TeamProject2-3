import { Outlet } from "react-router-dom";
import { Header } from "../../shared/Header/Header";
import "./AuthLayout.css";

export const AuthLayout = () => {
  return (
    <div id="authLayout">
      <div id="authLayout-Container">
        <Header backTo="/" title="" />

        <main id="authLayout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
