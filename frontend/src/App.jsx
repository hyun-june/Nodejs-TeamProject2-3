import { ToastContainer } from "./components/shared/Toast/Toast";
import { AppRouter } from "./routes/AppRouter";
import "./reset.css";
import "./App.css";

function App() {

  return (
      <div id="container">
          <ToastContainer/>
          <div id="bottom-sheet"/>
          <AppRouter />
      </div>
  );
}

export default App;
