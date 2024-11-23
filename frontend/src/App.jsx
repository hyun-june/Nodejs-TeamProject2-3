import { useState, useEffect } from "react";
import { AppRouter } from "./routes/AppRouter";
import { Cover } from "./components/Main/Cover/Cover";
import "./reset.css";
import "./App.css";

function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("isStart")) {
      sessionStorage.setItem("isStart", "true");
      setIsCoverOpen(true);
    } else {
      setIsCoverOpen(false);
    }
  }, []);

  const handleCloseModal = () => {
    sessionStorage.setItem("isStart", "false");
    setIsCoverOpen(false);
  };

  return (
    <div id="container">
      <div id="bottom-sheet" />
      {isCoverOpen ? <Cover onClose={handleCloseModal} /> : <AppRouter />}
    </div>
  );
}

export default App;
