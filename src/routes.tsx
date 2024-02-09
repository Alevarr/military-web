import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import DepartmentsPage from "./pages/DepartmentsPage";
import CitizensPage from "./pages/CitizensPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "citizens", element: <CitizensPage /> },
      { path: "departments", element: <DepartmentsPage /> },
    ],
  },
]);

export default router;
