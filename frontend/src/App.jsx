
import { Routes,Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/PlaceOrder/Placeorder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import Developers from "./pages/Developers/Developers";


const App = () => {

    const[showLogin,setShowlogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowlogin={setShowlogin}/>:<></>}
      <div className="App">
        <Navbar setShowlogin={setShowlogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myorders" element={<MyOrders/>} />
          <Route path="/developers" element={<Developers />} />
          
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
