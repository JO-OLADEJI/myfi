import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Profile, Home, Chart, Settings, Star } from "@/assets/sidebar";

export const SideBar = () => {
  const location = useLocation();
  return (
    <div className="bg-white  w-[125px] h-full rounded-r-lg flex flex-col items-center gap-10 pt-10">
      <img src="/myfi.png" alt="MyFi logo" className="w-[70px]" />
      {SideBarItems.map((item, index) => (
        <Link
          to={item.path}
          className={` w-full flex items-center justify-center ${
            new RegExp(`^(${item.path})(/)?$`).test(location.pathname) &&
            "border-l-4 border-l-primary text-primary"
          }`}
          key={index}
        >
          {React.createElement(
            "i",
            {
              style: {
                stroke: new RegExp(`^(${item.path})(/)?$`).test(
                  location.pathname
                )
                  ? "#2643DB"
                  : "",
              },
            },
            item.icon
          )}
        </Link>
      ))}
    </div>
  );
};

const SideBarItems = [
  {
    icon: <Home />,
    path: "/dashboard",
  },
  {
    icon: <Chart />,
    path: "/dashboard/analytics",
  },

  {
    icon: <Star />,
    path: "/star",
  },
  {
    icon: <Profile />,
    path: "/profile",
  },
  {
    icon: <Settings />,
    path: "/settings",
  },
];
