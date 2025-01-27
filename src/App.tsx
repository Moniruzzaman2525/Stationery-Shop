import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Banner from "./components/ui/Banner";
import Category from "./components/ui/Category";
import BannerProduct from "./components/ui/BannerProduct";

function App() {
  const location = useLocation();

  return (
    <div className="md:px-16">
      <Navbar />
      {location.pathname === '/' && (
        <>
          <Banner />
          <BannerProduct />
          <Category />
        </>
      )}
      <Outlet />
    </ div>
  );
}

export default App;
