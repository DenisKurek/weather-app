import React from "react";
import Navbar from "./components/Navbar";
import ArchiveDataPage from "./pages/ArchiveDataPage";
import CurentDataPage from "./pages/CurentDataPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/archive", element: <ArchiveDataPage /> },
      { path: "/current", element: <CurentDataPage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
