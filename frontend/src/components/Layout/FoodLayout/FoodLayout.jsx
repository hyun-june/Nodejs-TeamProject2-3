import { Outlet } from "react-router-dom";
import "./FoodLayout.css";

export const FoodLayout = () => {
  return (
    <div id="food-layout">
      <Outlet />
    </div>
  );
};
