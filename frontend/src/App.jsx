import { AppRouter } from "./routes/AppRouter";
import { NavBar } from "./components/shared/NavBar/NavBar.jsx";
import { useLocation } from "react-router-dom";
import "./reset.css";
import "./App.css";
import { AppLayout } from "./components/Layout/AllLayout/AppLayout.jsx";

function App() {
  const location = useLocation();
  const showNavbar = ["/", "/feed", "/my"].includes(location.pathname);

  return (
    <div>
      <AppLayout>
        <AppRouter />
        {showNavbar && <NavBar />}
      </AppLayout>
    </div>
  );
}

export default App;
