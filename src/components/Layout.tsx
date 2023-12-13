import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./ui/Navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
