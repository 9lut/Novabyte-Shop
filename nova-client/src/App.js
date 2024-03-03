import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home";
import { Protector } from './helpers';
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Profile from "./pages/profile/profile";
import ProductView from './components/product/productView';
import ProductAll from "./pages/productAll";
import Payment from "./pages/payment/payment";
import PaymentHistory from "./pages/payment/historyPament";
import Cart from "./components/cart/cart";
import OrderHistory from "./components/order/orderHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product-detail/:id" element={<ProductView />} />
        <Route path="/productall" element={<ProductAll />} />
        <Route path="/cart" element={<Cart />} />

        {/* ต้อง Login */}
        <Route path="/profile" element={<Protector Component={Profile} />} />
        <Route path="/payment" element={<Protector Component={Payment} />} />
        <Route path="/paymenthistory" element={<Protector Component={PaymentHistory} />} />
        <Route path="/orderhistory" element={<Protector Component={OrderHistory} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
