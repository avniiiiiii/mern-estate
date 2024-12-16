import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ListCreate from "./pages/ListCreate.jsx";
import Listing from "./pages/Listing.jsx";
import Search from "./pages/Search.jsx";

import usePageTracking from "./hooks/usePageTracking";

const App = () => {
  usePageTracking();
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        {/* //private because no acces until authorised */}

        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/list-create" element={<ListCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
