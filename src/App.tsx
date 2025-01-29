import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Banner from "./components/ui/Banner";
import Category from "./components/ui/Category";
import BannerProduct from "./components/ui/BannerProduct";
import Footer from "./components/ui/Footer";
import ShoppingInfo from "./components/ui/ShoppingInfo";
import TestimonialsPage from "./components/ui/TestimonialsPage";

function App() {
  const location = useLocation();

  return (
    <div >
      <Navbar />
      {location.pathname === '/' && (
        <>
          <Banner />
          <ShoppingInfo />
          <BannerProduct />
          <Category />
          <TestimonialsPage />
        </>
      )}
      <Outlet />

      <Footer />
    </ div>
  );
}

export default App;
