import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/SideBar";

export const DashLayout = () => {
  return (
    <div className="w-screen h-screen flex bg-base-100">
      <SideBar />
      <Outlet />
    </div>
  );
};
