import React from "react";
import { Route, Routes } from "react-router";
import { MainPage } from "../pages/MainPage/MainPage";
import { FeedPage } from "../pages/FeedPage/FeedPage";
import { MyPage } from "../pages/MyPage/MyPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import UserDetailPage from "../pages/UserDetailPage/UserDetailPage";
// import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="user/detail" element={<UserDetailPage />} />
    </Routes>
  );
};
