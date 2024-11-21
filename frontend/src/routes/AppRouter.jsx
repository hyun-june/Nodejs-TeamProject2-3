import { Route, Routes } from "react-router";
import { MainPage } from "../pages/MainPage/MainPage";
import { FeedPage } from "../pages/FeedPage/FeedPage";
import { UserPage } from "../pages/UserPage/UserPage";
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
import { FoodLayout } from "../components/Layout/FoodLayout/FoodLayout";
import { FoodSearchPage } from "../pages/FoodSearchPage/FoodSearchPage";
import { MainLayout } from "../components/Layout/MainLayout/MainLayout";
import { FeedCreatePage } from "../pages/FeedCreatePage/FeedCreatePage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainPage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="/user/me" element={<UserPage />} />
      </Route>
      <Route path="/user/:userId" element={<UserPage />} />
      <Route path="/feed-create" element={<FeedCreatePage />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/user/detail" element={<UserDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="food" element={<AdminFoodPage />} />
        <Route path="exercise" element={<AdminExercisePage />} />
        <Route path="feed" element={<AdminFeedPage />} />
      </Route>

      <Route path="/food" element={<FoodLayout />}>
        <Route index element={<DailyFoodPage />} />
        <Route path="search" element={<FoodSearchPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
