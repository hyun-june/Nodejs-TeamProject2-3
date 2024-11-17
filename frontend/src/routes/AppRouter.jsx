import { Route, Routes } from "react-router";
import { MainPage } from "../pages/MainPage/MainPage";
import { FeedPage } from "../pages/FeedPage/FeedPage";
import { MyPage } from "../pages/MyPage/MyPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { UserDetailPage } from "../pages/UserDetailPage/UserDetailPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { AdminExercisePage } from "../pages/AdminExercisePage/AdminExercisePage";
import { AdminFeedPage } from "../pages/AdminFeedPage/AdminFeedPage";
import { AdminFoodPage } from "../pages/AdminFoodPage/AdminFoodPage";
import { AdminLayout } from "../components/Layout/AdminLayout/AdminLayout";
import { AuthLayout } from "../components/Layout/AuthLayout/AuthLayout";
import { DailyFoodPage } from "../pages/DailyFoodPage/DailyFoodPage";
import { MainLayout } from "../components/Layout/MainLayout/MainLayout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainPage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="my" element={<MyPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/user/detail" element={<UserDetailPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="food" element={<AdminFoodPage />} />
        <Route path="exercise" element={<AdminExercisePage />} />
        <Route path="feed" element={<AdminFeedPage />} />
      </Route>

      <Route path="/food" element={<DailyFoodPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
