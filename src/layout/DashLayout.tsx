import { SideBar } from "@/components/SideBar";
import { Outlet } from "react-router-dom";

export const DashLayout = () => {
  return (
    <div className="h-screen flex bg-base-100">
      <SideBar />
      <div className="p-5 grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
