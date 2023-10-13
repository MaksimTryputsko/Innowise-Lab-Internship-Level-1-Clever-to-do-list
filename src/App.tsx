import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/EntryPage/LoginPage";
import { HomePage } from "./pages/HomePage";
import { HOME_PAGE, LOGIN_PAGE, REGISTER_PAGE } from "constants/routes";
import { RegisterPage } from "pages/EntryPage/RegisterPage";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={HOME_PAGE}></Route>
      <Route element={<HomePage />} path="/:pageId"></Route>
      <Route element={<RegisterPage />} path={REGISTER_PAGE}></Route>
      <Route element={<LoginPage />} path={LOGIN_PAGE}></Route>
    </Routes>
  );
}

export { App };
