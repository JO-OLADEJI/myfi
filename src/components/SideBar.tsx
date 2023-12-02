import { Link, useLocation } from "react-router-dom";
import { Home } from "../assets/sidebar/Home";

export const SideBar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="bg-white w-[125px] h-full rounded-r-lg flex flex-col items-center gap-10 py-4">
      <img src="/logo.png" />
      {SideBarItems.map((item, index) => (
        <Link
          to={item.path}
          className={` w-full flex items-center justify-center ${
            location.pathname === item.path && "border-l-4 border-l-primary"
          }`}
          key={index}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

const SideBarItems = [
  {
    icon: <Home />,
    path: "/",
  },
  {
    icon: <Home />,
    path: "/dashboard",
  },
  {
    icon: <Home />,
    path: "/dashboard",
  },
  {
    icon: <Home />,
    path: "/dashboard",
  },
];
