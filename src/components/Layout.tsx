import { Outlet } from "react-router-dom";
import { Navbar } from "./ui/Navbar";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
