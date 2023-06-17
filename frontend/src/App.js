import React from "react";
import ArchiveDataPage from "./pages/ArchiveDataPage";
import CurentDataPage from "./pages/CurentDataPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import LoginPanel from "./pages/LoginPanel";
import { action as authAction } from "./pages/LoginPanel";
import { checkAuthLoader, tokenLoader } from "./utils/Auth";
import { action as logoutAction } from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    loader: tokenLoader,
    children: [
      { path: "/login", element: <LoginPanel />, action: authAction },
      {
        path: "/archive",
        element: <ArchiveDataPage />,
        loader: checkAuthLoader,
      },
      {
        path: "/current",
        element: <CurentDataPage />,
        loader: checkAuthLoader,
      },
      { path: "/logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
