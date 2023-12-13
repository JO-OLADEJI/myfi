import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/SideBar";

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
