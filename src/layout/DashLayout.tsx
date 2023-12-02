import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";

export const DashLayout = () => {
  return (
    <div className="w-screen flex">
      <SideBar />
      <Outlet />
    </div>
  );
};
