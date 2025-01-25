import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Banner from "./components/ui/Banner";
import Category from "./components/ui/Category";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {location.pathname === '/' && (
        <>
          <Banner />
          <Category />
        </>
      )}
      <Outlet />
    </>
  );
}

export default App;
