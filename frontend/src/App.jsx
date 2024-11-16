import { AppRouter } from "./routes/AppRouter";
import { NavBar } from "./components/shared/NavBar/NavBar.jsx";
import { useLocation } from "react-router-dom";
import "./reset.css";
import "./App.css";

function App() {
  const location = useLocation();
  const showNavbar = ["/", "/feed", "/my"].includes(location.pathname);

  return (
    <div>
      <AppRouter />
      {showNavbar && <NavBar />}
    </div>
  );
}

export default App;
