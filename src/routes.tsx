import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import DepartmentsPage from "./pages/DepartmentsPage";
import CitizensPage from "./pages/CitizensPage";
import CitizenDetailsPage from "./pages/CitizenDetailsPage";
import SignInPage from "./pages/SignInPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "citizens",
        element: <CitizensPage />,
      },
      { path: "citizens/:id", element: <CitizenDetailsPage /> },
      { path: "departments", element: <DepartmentsPage /> },
      { path: "sign-in", element: <SignInPage /> },
    ],
  },
]);

export default router;
