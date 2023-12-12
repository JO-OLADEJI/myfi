import { Outlet } from "react-router-dom";
import { Navbar } from "./ui/Navbar";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
