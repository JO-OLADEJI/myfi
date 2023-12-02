import { Link, useLocation } from "react-router-dom";
import { Profile, Home, Chart, Settings, Star } from "@/assets/sidebar";
import React from "react";

export const SideBar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="bg-white  w-[125px] h-full rounded-r-lg flex flex-col items-center gap-10 py-4">
      <img src="/logo.png" />
      {SideBarItems.map((item, index) => (
        <Link
          to={item.path}
          className={` w-full flex items-center justify-center ${
            location.pathname === item.path &&
            "border-l-4 border-l-primary text-primary"
          }`}
          key={index}
        >
          {React.createElement(
            "i",
            {
              style: {
                stroke: location.pathname === item.path ? "#2643DB" : "",
              },
            },
            item.icon
          )}

          {/* {item.icon} */}
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
    path: "/chart",
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
