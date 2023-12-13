import { createBrowserRouter } from "react-router-dom";
import { DashLayout } from "./layout/DashLayout";
import { Analytics, Dashboard, Home } from "./pages";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },
]);

export default router;
