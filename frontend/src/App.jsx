import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { Cover } from "./components/Main/Cover/Cover";
import "./reset.css";
import "./App.css";

function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isStart")) {
      sessionStorage.setItem("isStart", "true");
      setIsCoverOpen(true);
    } else {
      setIsCoverOpen(false);
    }
  }, []);

  const handleCloseCover = () => {
    sessionStorage.setItem("isStart", "false");
    setIsCoverOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isStart");
    sessionStorage.removeItem("userId");
    navigate("/login");
    setIsCoverOpen(true);
  };

  return (
    <div id="container">
      <div id="bottom-sheet" />
      {isCoverOpen ? (
        <Cover onClose={handleCloseCover} />
      ) : (
        <AppRouter handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
