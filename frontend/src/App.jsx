import "./reset.css";
import "./App.css";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { UserDetailPage } from "./pages/UserDetailPage/UserDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div id="commonLayout">
      <div id="commonLayout-Container">
        <LoginPage />
        {/* <SignUpPage />
        <UserDetailPage />
        <NotFoundPage /> */}
      </div>
    </div>
  );
}

export default App;
